#pragma once

#pragma warning(disable : 4996)

#include <string>
#include <time.h>
#include <array>

namespace utility {

	inline HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);

	inline std::string timestamp() {
		time_t now = time(0);
		char timestamp[10] = "";
		_Strftime(timestamp, 10, "%H:%M:%S", localtime(&now), nullptr);
		return "[" + std::string(timestamp) + "] ";
	}

	inline void setConsoleColor(u_short color) {
		SetConsoleTextAttribute(hConsole, color);
	}
}