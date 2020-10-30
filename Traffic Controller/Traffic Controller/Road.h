#pragma once
#include <string>
#include <vector>
#include <map>

#include <nlohmann/json.hpp>

using json = nlohmann::json;
using u_short = unsigned short;


class Road {
public:
	Road(u_short laneAmount, std::string name);

	json toJson();
	void update(const json& j);
private:
	std::string name;
	std::map<std::string, bool> lanes;
};

