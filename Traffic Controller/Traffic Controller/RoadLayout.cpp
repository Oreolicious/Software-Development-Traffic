#include "RoadLayout.h"
#include <fstream>
#include "Utility.h"
#include <iostream>

void RoadLayout::loadLayout(std::string filename)
{
	try {
		std::vector<Lane> result;
		std::ifstream layoutFile(filename);

		std::string line;

		while (std::getline(layoutFile, line)) {
			std::vector<std::string> tokens = utility::split(line, ";");
			std::vector<std::string> exclusions = utility::split(tokens.at(2), ",");
			result.push_back(Lane{ tokens.at(0), exclusions, std::stod(tokens.at(1)) });
		}

		if (result.size() == 0) {
			throw std::runtime_error("File does not exist");
		}

		this->layout = result;
		layoutFile.close();
	}
	catch(std::exception e) {
		utility::setConsoleColor(12);
		std::cout << utility::timestamp() << "Error reading layout file: " << filename << " " << e.what() << std::endl;
		utility::setConsoleColor(7);
	}
}

std::vector<Lane> RoadLayout::getLayout()
{
	return this->layout;
}
