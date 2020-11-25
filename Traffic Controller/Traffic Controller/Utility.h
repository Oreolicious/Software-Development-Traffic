#pragma once

#pragma warning(disable : 4996)

#include <string>
#include <time.h>
#include <array>
#include <vector>
#include <windows.h>

namespace utility {

	inline HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);

	inline std::string timestamp() {
		time_t now = time(0);
		char timestamp[10] = "";
		_Strftime(timestamp, 10, "%H:%M:%S", localtime(&now), nullptr);
		return "[" + std::string(timestamp) + "] ";
	}

	inline void setConsoleColor(unsigned short color) {
		SetConsoleTextAttribute(hConsole, color);
	}

	inline std::vector<std::string> split(const std::string& str, const std::string& delim) {
		std::vector<std::string> tokens;
		size_t prev = 0, pos = 0;
		do
		{
			pos = str.find(delim, prev);
			if (pos == std::string::npos) pos = str.length();
			std::string token = str.substr(prev, pos - prev);
			tokens.push_back(token);
			prev = pos + delim.length();
		} while (pos < str.length() && prev < str.length());
		return tokens;
	}
}