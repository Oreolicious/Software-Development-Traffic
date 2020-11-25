#pragma once
#include <string>
#include <vector>

struct Lane {
	std::string name;
	std::vector<std::string> exclusions;
	double priorityMultiplier = 1;
	double currentPriority = 0;
	bool isOn = false;
	bool hasCar = false;

	void cycle() {
		currentPriority = ((currentPriority + (1 * hasCar * (1 - (1 * isOn)))) * hasCar) * (1 - (0.25 * isOn));
	}
};

inline bool operator==(std::vector<Lane*>& lhs, std::vector<Lane*>& rhs) {
	if (lhs.size() != rhs.size())
		return false;
	for (unsigned short i = 0; i < lhs.size(); i++) {
		if (lhs.at(i)->name != rhs.at(i)->name)
			return false;
	}
	return true;
}