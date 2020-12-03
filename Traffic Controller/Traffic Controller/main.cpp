#include <iostream>
#include <thread>
#include <atomic>

#include "SocketHandler.h"
#include "nlohmann/json.hpp" 
#include "Utility.h"
#include "RoadManager.h"

using json = nlohmann::json; // Define json as nlohmann library json
using u_short = unsigned short;

// Forward declarations
void handleMessage(SocketHandler& handler, RoadManager& manager, std::atomic<bool>& stop_flag, std::atomic<bool>& manager_available); // Thread function for receiving messages from client
void dispatchMessage(SocketHandler& handler, RoadManager& manager, std::string message, std::atomic<bool>& isSending, std::atomic<bool>& manager_available); // Thread function for sending a new configuration to client

int main() {
	SocketHandler handler; // Socket communication handler instance

	// Threading requirements
	std::thread messageThread;				// Create thread for handling messages
	std::thread configurationDispatcher;	// Create thread for sending messages
	// Several bool flags for threading functions
	std::atomic<bool> stop_flag = true;
	std::atomic<bool> manager_available = true;
	std::atomic<bool> isSending = false;

	// Timing information for sending updates
	std::chrono::system_clock::time_point timeOfLastUpdate;
	unsigned short updateWait = 2;

	// Load layout file into the RoadManager. Terminates the program if invalid layout file
	RoadManager manager("./Layouts/main.rl");
	if (!manager.isValid()) {
		std::cin.get();
		return 1;
	}

	// Main program loop
	while (true) {
		// If handler doesn't have client, wait for a new one
		// There's no point in running the main loop without client
		if (!handler.hasClient()) {
			// Join the receive thread in case it is running
			if (stop_flag == false) {
				stop_flag = true;
				messageThread.join();
			}
			std::cout << utility::timestamp() << "Waiting for a client to connect..." << std::endl;
			// Wait for a new client, retry if failed
			do {
				handler.waitForClient(54000);
			} while (!handler.hasClient());
			// Start receive function and send a message of the last layout
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

/// <summary>
/// Thread function for receiving messages from client
/// </summary>
/// <param name="handler">Reference to the SocketHandler instance</param>
/// <param name="manager">Reference to the RoadManager instance</param>
/// <param name="stop_flag">Reference to the stop flag atomic boolean</param>
/// <param name="manager_available">Reference to the manager_available flag atomic boolean</param>
void handleMessage(SocketHandler& handler, RoadManager& manager, std::atomic<bool>& stop_flag, std::atomic<bool>& manager_available) {
	buffer message;
	int bytesReceived;

	// Run loop while thread not asked to stop
	while (!stop_flag) {
		// Check if message available
		if (handler.hasMessage(500) && !stop_flag) {
			handler.receive(message, bytesReceived); // Receive message
			unsigned short bufferSize = sizeof(message) / sizeof(char);
			std::string jsonSize;
			unsigned short i;
			//for each byte in the buffer, look for the size header with delim :
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
			// If message has valid size, parse the json and update manager instance
			if (i != 0) {
				manager_available = false;
				json receivedJson = json::parse(std::string(message, i + 1, std::stoi(jsonSize)));
				manager.updateLanes(receivedJson);
				manager_available = true;
			}
		}
	}
}

/// <summary>
/// Dispatch a message to client
/// </summary>
/// <param name="handler">Reference to SocketHandler instance</param>
/// <param name="manager">Reference to the RoadManager instance</param>
/// <param name="message">Current message, will not be used as eventual message</param>
/// <param name="isSending">atomic boolean flag for status of sending message</param>
/// <param name="manager_available">atomic boolean flag for availability of RoadManager instance</param>
void dispatchMessage(SocketHandler& handler, RoadManager& manager, std::string message, std::atomic<bool>& isSending, std::atomic<bool>& manager_available)
{
	isSending = true;
	json redJson = json::parse(message);
	for (auto& el : redJson.items()) {
		redJson[el.key()] = 0;
	}
	handler.sendMessage(redJson.dump()); // Send json with all off values
	std::this_thread::sleep_for(std::chrono::seconds(5)); // wait for 5 seconds (Ontruimingstijd)
	while (!manager_available) {
		std::this_thread::sleep_for(std::chrono::milliseconds(50));
	}
	manager_available = false;
	// Send current best configuration
	manager.updateLanesForBestConfig();
	if (handler.hasClient()) {
		handler.sendMessage(manager.toJson().dump());
	}
	manager_available = true;
}

