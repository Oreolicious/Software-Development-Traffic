#include "RoadManager.h"
#include "RoadLayout.h"
#include <iostream>
#include "Utility.h"

RoadManager::RoadManager(std::string layoutFile)
{
	std::cerr << utility::timestamp() << "Attempting to parse layout file: " << layoutFile << std::endl;
	RoadLayout layout;
	layout.loadLayout(layoutFile);
	this->lanes = std::vector<Lane>(layout.getLayout());

	if (lanes.size() == 0)
		return;

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

	removeDuplicates(configurations);

	utility::setConsoleColor(10);
	std::cerr << utility::timestamp() << "Loaded layout file successfully: " << configurations.size() << " configurations available" << std::endl;
	utility::setConsoleColor(7);
}

void RoadManager::updateLanes(json update)
{
	for (auto& el : update.items()) {
		for (Lane& lane : lanes) {
			if (el.key() == lane.name)
				lane.hasCar = el.value()!=0;
		}
	}
}

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

bool RoadManager::isValid()
{
	return this->lanes.size() > 0;
}

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
