#include "RoadController.h"

json RoadController::toJson()
{
	json result;
	for (u_short i = 0; i < roads.size(); i++) {
		json road = roads[i].toJson();
		for (auto& [key, value] : road.items()) {
			result[key] = rand() % 2;
		}
	}
	return result;
}

void RoadController::updateOccupancy(json occupancy)
{
	this->occupancy = occupancy;
}
