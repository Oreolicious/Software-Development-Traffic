#pragma once
#include <string>
#include <vector>
#include "Lane.h"

class RoadLayout
{
public:
	void loadLayout(std::string filename); // Load a layout file into the layout vector
	std::vector<Lane> getLayout(); // Get the layout information from the RoadLayout object

private:
	std::vector<Lane> layout; // Holds all the read lanes for the layout information
};

