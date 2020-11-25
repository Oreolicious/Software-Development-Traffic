#pragma once
#include <string>
#include <vector>
#include "Lane.h"
#include "nlohmann/json.hpp" 

using json = nlohmann::json;

class RoadManager
{
public:
	RoadManager(std::string layoutFile);

	void updateLanes(json update);
	bool updateLanesForBestConfig();

	bool isValid();
	json toJson();
private:
	std::vector<Lane> lanes;
	std::vector<std::vector<Lane*>> configurations;
	std::vector<Lane*>* currentConfig = nullptr;
	
	void removeLane(std::string name, std::vector<Lane*>& lanes);
	void removeDuplicates(std::vector<std::vector<Lane*>>& v);
};

