#pragma once
#include <string>
#include <vector>

struct Lane {
	std::string name; // Codename for lane light
	std::vector<std::string> exclusions; // Lanes that cannot turn on in the same cycle as this lane
	double priorityMultiplier = 1; // Priority for this specific lane
	double currentPriority = 0; // Increasing parameter based on the waiting time and priorityMultiplier
	bool isOn = false; // Boolean for the status of the traffic light
	bool hasCar = false; // Boolean for the status of pressure sensor at light

	/// <summary>
	/// Gets called every roadmanager update to update the current priority
	/// </summary>
	void cycle() {
		currentPriority = ((currentPriority + (1 * hasCar * (1 - (1 * isOn)))) * hasCar) * (1 - (0.25 * isOn));
	}
};

// Function to compare two configurations and see if they are the same
inline bool operator==(std::vector<Lane*>& lhs, std::vector<Lane*>& rhs) {
	if (lhs.size() != rhs.size())
		return false;
	for (unsigned short i = 0; i < lhs.size(); i++) {
		if (lhs.at(i)->name != rhs.at(i)->name)
			return false;
	}
	return true;
}