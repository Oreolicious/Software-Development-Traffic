#include "RoadManager.h"
#include "RoadLayout.h"
#include <iostream>
#include "Utility.h"

/// <summary>
/// Create a new RoadManager instance based on a layout file that describes the intersection
/// </summary>
/// <param name="layoutFile"></param>
RoadManager::RoadManager(std::string layoutFile)
{
	std::cerr << utility::timestamp() << "Attempting to parse layout file: " << layoutFile << std::endl;
	RoadLayout layout; // Object that handles file parsing
	layout.loadLayout(layoutFile);
	this->lanes = std::vector<Lane>(layout.getLayout()); // Load layout from RoadLayout object

	// If no lanes were loaded, no point in continuing (RoadLayout invalid)
	if (lanes.size() == 0)
		return;

	// Get all possible lane configurations based on their individual exclusions
	for (Lane& lane : lanes) {
		std::vector<Lane*> lanesCopy;
		lanesCopy.reserve(lanes.size());
		for (Lane& lane : lanes) {
			lanesCopy.push_back(&lane);
		}
		for (std::string exclusion : lane.exclusions) {
			removeLane(exclusion, lanesCopy);
		}
		for (unsigned int i = 0; i < lanesCopy.size(); i++) {
			std::vector<Lane*> option(lanesCopy);
			for (std::string exclusion : lanesCopy.at(i)->exclusions) {
				removeLane(exclusion, option);
			}
			for (unsigned int j = 0; j < option.size(); j++) {
				for (std::string exclusion : option.at(j)->exclusions) {
					removeLane(exclusion, option);
				}
			}
			configurations.push_back(option);
		}
	}

	// Remove duplicate layouts (Important optimization step)
	removeDuplicates(configurations);

	utility::setConsoleColor(10);
	std::cerr << utility::timestamp() << "Loaded layout file successfully: " << configurations.size() << " configurations available" << std::endl;
	utility::setConsoleColor(7);
}

/// <summary>
/// Update all pressure sensor values for the lanes specified in the input json
/// </summary>
/// <param name="update">Json that holds pressure sensor data</param>
void RoadManager::updateLanes(json update)
{
	for (auto& el : update.items()) {
		for (Lane& lane : lanes) {
			if (el.key() == lane.name)
				lane.hasCar = el.value()!=0;
		}
	}
}

/// <summary>
/// Get all individual configuration scores and see which configuration gets the highest score
/// </summary>
/// <returns>Returns true if there is a new best layout</returns>
bool RoadManager::updateLanesForBestConfig()
{
	// Update all the priority values for the lanes
	for (Lane& lane : lanes)
		lane.cycle();

	// Get the total priority value for each configuration of lanes
	std::vector<double> configurationValues;
	configurationValues.reserve(configurations.size());
	for (std::vector<Lane*>& configuration : configurations) {
		double totalValue = 0;
		for (Lane* lane : configuration) {
			totalValue += lane->currentPriority;
		}
		configurationValues.push_back(totalValue);
	}
	
	// Get number of best configuration score
	unsigned short bestConfig = 0;
	unsigned short bestScore = 0;
	
	for (unsigned short i = 0; i < configurationValues.size(); i++) {
		if (configurationValues.at(i) > bestScore) {
			bestConfig = i;
			bestScore = configurationValues.at(i);
		}
		if (configurationValues.at(i) == bestScore && configurations.at(i).size() > configurations.at(bestConfig).size()) {
			bestConfig = i;
		}
	}

	// Only continue if the current best configuration has a score above 0
	// If the current best has a score of 0, that means there's 0 occupancy
	// In that case we turn off all the lights
	if (bestScore == 0) {
		// If current config = nullptr then all lights are already off and no update has to take place
		// in case there were lights on, the configuration gets updated and the simulation gets sent a new state
		if (currentConfig == nullptr) {
			return false;
		}
		else {
			currentConfig = nullptr;
			for (Lane& lane : lanes) {
				lane.isOn = false;
			}
			return true;
		}
	}
	else {
		// Update all the lanes based on the new best configuration
		std::vector<Lane*> newBest = configurations.at(bestConfig);
		if (currentConfig && (*currentConfig) == newBest)
			return false;
		else {
			for (Lane& lane : lanes) {
				lane.isOn = false;
			}
			for (Lane* lane : newBest) {
				lane->isOn = true;
			}
			return true;
		}		
	}
	
}

/// <summary>
/// Check function to see if RoadManager holds lanes
/// </summary>
/// <returns>Returns true if there is a lane in the lanes vector, else return false for invalid layout</returns>
bool RoadManager::isValid()
{
	return this->lanes.size() > 0;
}

/// <summary>
/// Put all names of the lanes in a json with their current on / off status
/// </summary>
/// <returns>A json of all light on / off status variables</returns>
json RoadManager::toJson()
{
	json laneStates;
	for (Lane& lane : lanes) {
		laneStates[lane.name] = (int)lane.isOn;
	}
	return laneStates;
}

void RoadManager::removeLane(std::string name, std::vector<Lane*>& lanes)
{
	for (unsigned short i = 0; i < lanes.size(); i++) {
		if (lanes.at(i)->name == name) {
			lanes.erase(lanes.begin() + i);
			break;
		}
	}
}

void RoadManager::removeDuplicates(std::vector<std::vector<Lane*>>& v)
{
	for (unsigned short i = 0; i < v.size(); i++) {
		for (unsigned short j = i + 1; j < v.size() - 1; j++) {
			if (v.at(i) == v.at(j)) {
				v.erase(v.begin() + j);
			}
		}
	}
}
