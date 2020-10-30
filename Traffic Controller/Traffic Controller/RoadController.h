#pragma once
#include <array>
#include "Road.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;
using u_short = unsigned short;


class RoadController
{
public:
	RoadController(){}
	
	json toJson();
	void updateOccupancy(json occupancy);
private:
	json occupancy;
	u_short cycle;

	std::array<Road, 16> roads = {
		Road(3, "A1"), Road(2, "B1"), Road(2, "F1"), Road(4, "V1"),
		Road(4, "A2"), Road(2, "F2"), Road(4, "V2"), Road(4, "A3"),
		Road(4, "A4"), Road(1, "B4"), Road(2, "F4"), Road(4, "V4"),
		Road(4, "A5"), Road(2, "F5"), Road(4, "V5"), Road(4, "A6")
	};
};

