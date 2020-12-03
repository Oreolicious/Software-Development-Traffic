#pragma once

#pragma warning(disable : 4996) // Disable security warning for _Strftime

#include <string>
#include <time.h>
#include <array>
#include <vector>
#include <windows.h>

// Utility functions

namespace utility {

	inline HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE); // Handle to the current console window

	// Create a timestamp for console output
	inline std::string timestamp() {
		time_t now = time(0);
		char timestamp[10] = "";
		_Strftime(timestamp, 10, "%H:%M:%S", localtime(&now), nullptr);
		return "[" + std::string(timestamp) + "] ";
	}

	// Change the current console color using the handle declared above
	inline void setConsoleColor(unsigned short color) {
		SetConsoleTextAttribute(hConsole, color);
	}

	/// <summary>
	/// Function to split a string based on a custom delimiter
	/// </summary>
	/// <param name="str">String to split</param>
	/// <param name="delim">Delimiter character(s)</param>
	/// <returns>A vector of strings with all splits from input string</returns>
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