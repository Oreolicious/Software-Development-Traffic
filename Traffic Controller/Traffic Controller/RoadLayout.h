#pragma once
#include <string>
#include <vector>
#include "Lane.h"

class RoadLayout
{
public:
	void loadLayout(std::string filename);
	std::vector<Lane> getLayout();

private:
	std::vector<Lane> layout;
};

