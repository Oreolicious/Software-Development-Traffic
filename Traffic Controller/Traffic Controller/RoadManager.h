#pragma once
#include <string>
#include <vector>
#include "Lane.h"
#include "nlohmann/json.hpp" 

using json = nlohmann::json;

class RoadManager
{
public:
	RoadManager(std::string layoutFile); // Create a new roadmanager based on a layout file

	void updateLanes(json update); // Update the lanes based on a Json that holds pressure sensor information for all the lights
	bool updateLanesForBestConfig(); // Get all configuration scores and update the current best configuration if nessecary

	bool isValid(); // See if the roadManager holds valid lane information
	json toJson(); // Return the current best road configuration as json
private:
	std::vector<Lane> lanes; // Holds all the lanes that the roadmanager can work with
	std::vector<std::vector<Lane*>> configurations; // Holds all the possible configurations of the lanes
	std::vector<Lane*>* currentConfig = nullptr; // Holds the current best configuration with the maximum score
	
	// Helper functions
	void removeLane(std::string name, std::vector<Lane*>& lanes);
	void removeDuplicates(std::vector<std::vector<Lane*>>& v);
};

