#include "Road.h"

Road::Road(u_short laneAmount, std::string name) : name(name) 
{
	for (u_short i = 0; i < laneAmount; i++)
	{
		this->lanes.insert(std::pair<std::string, bool>(name + "-" + std::to_string(i + 1), false));
	}
}

json Road::toJson()
{
	json result;
	for (std::map<std::string, bool>::value_type& lane : lanes) {
		result[lane.first] = static_cast<u_short>(lane.second);
	}
	return result;
}

void Road::update(const json& j)
{
	for (auto& [key, value] : j.items()) {
		if (lanes.count(key) > 0) {
			lanes[key] = static_cast<bool>(value);
		}
	}
}
