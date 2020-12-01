#include <iostream>
#include <thread>
#include <atomic>

#include "SocketHandler.h"
#include "nlohmann/json.hpp" 
#include "Utility.h"
#include "RoadManager.h"

using json = nlohmann::json;
using u_short = unsigned short;

// Forward declarations
void handleMessage(SocketHandler& handler, RoadManager& manager, std::atomic<bool>& stop_flag, std::atomic<bool>& manager_available);
void dispatchMessage(SocketHandler& handler, RoadManager& manager, std::string message, std::atomic<bool>& isSending, std::atomic<bool>& manager_available);

int main() {
	SocketHandler handler;
	// Threading requirements
	std::thread messageThread;
	std::thread configurationDispatcher;
	std::atomic<bool> stop_flag = true;
	std::atomic<bool> manager_available = true;
	std::atomic<bool> isSending = false;

	// Timing information for sending updates
	std::chrono::system_clock::time_point timeOfLastUpdate;
	unsigned short updateWait = 2;

	RoadManager manager("./Layouts/main.rl");
	if (!manager.isValid()) {
		std::cin.get();
		return 1;
	}

	while (true) {
		if (!handler.hasClient()) {
			if (stop_flag == false) {
				stop_flag = true;
				messageThread.join();
			}
			std::cout << utility::timestamp() << "Waiting for a client to connect..." << std::endl;
			do {
				handler.waitForClient(54000);
			} while (!handler.hasClient());
			stop_flag = false;
			messageThread = std::thread(handleMessage, std::ref(handler), std::ref(manager), std::ref(stop_flag), std::ref(manager_available));
			timeOfLastUpdate = std::chrono::system_clock::now();
			handler.sendMessage(manager.toJson().dump());
		}
		// If statement gets triggered every 5 seconds to update the traffic lights
		auto currentTime = std::chrono::system_clock::now();
		if (std::chrono::duration<double>(currentTime - timeOfLastUpdate).count() >= updateWait && manager_available) {
			updateWait = 5;
			manager_available = false;
			utility::setConsoleColor(3);
			std::cerr << utility::timestamp() << "Calculating best configuration" << std::endl;
			utility::setConsoleColor(7);

			// If true, best configuration has changed so send an update to the simulation
			if (manager.updateLanesForBestConfig()) {
				if (isSending) {
					configurationDispatcher.join();
					isSending = false;
				}
				
				updateWait += 5;
				configurationDispatcher = std::thread(dispatchMessage, std::ref(handler), std::ref(manager), manager.toJson().dump(), std::ref(isSending), std::ref(manager_available));
			}
			timeOfLastUpdate = std::chrono::system_clock::now();
			manager_available = true;
		}
	}
	return 0;
}

void handleMessage(SocketHandler& handler, RoadManager& manager, std::atomic<bool>& stop_flag, std::atomic<bool>& manager_available) {
	buffer message;
	int bytesReceived;

	while (!stop_flag) {
		if (handler.hasMessage(500) && !stop_flag) {
			handler.receive(message, bytesReceived);
			unsigned short bufferSize = sizeof(message) / sizeof(char);
			std::string jsonSize;
			unsigned short i;
			for (i = 0; i < bufferSize; i++) {
				if (message[i] == ':')
					break;
				else if (std::isdigit(message[i]))
					jsonSize += message[i];
				else {
					if (handler.hasClient()) {
						utility::setConsoleColor(12);
						std::cerr << utility::timestamp() << "Encountered error while parsing header" << std::endl;
						utility::setConsoleColor(7);
					}
					i = 0;
					break;
				}
			}
			if (i != 0) {
				manager_available = false;
				json receivedJson = json::parse(std::string(message, i + 1, std::stoi(jsonSize)));
				manager.updateLanes(receivedJson);
				manager_available = true;
			}
		}
	}
}

void dispatchMessage(SocketHandler& handler, RoadManager& manager, std::string message, std::atomic<bool>& isSending, std::atomic<bool>& manager_availalbe)
{
	isSending = true;
	json redJson = json::parse(message);
	for (auto& el : redJson.items()) {
		redJson[el.key()] = 0;
	}
	handler.sendMessage(redJson.dump());
	std::this_thread::sleep_for(std::chrono::seconds(5));
	while (!manager_availalbe) {
		std::this_thread::sleep_for(std::chrono::milliseconds(50));
	}
	manager_availalbe = false;
	manager.updateLanesForBestConfig();
	if (handler.hasClient()) {
		handler.sendMessage(manager.toJson().dump());
	}
	manager_availalbe = true;
}

