#include <iostream>

#include "SocketHandler.h"
#include "Road.h"
#include "RoadController.h"
#include "nlohmann/json.hpp" 

using json = nlohmann::json;
using u_short = unsigned short;

SocketHandler handler;

RoadController roadController;

int main() {
	buffer message;
	int bytesReceived;

	while (true) {
		if (!handler.hasClient()) {
			std::cout << "Waiting for a client to connect..." << std::endl;
			do {
				handler.waitForClient(54000);
			} while (!handler.hasClient());
		}
		if (handler.hasMessage(2000)) {
			handler.receive(message, bytesReceived);
		}
		else {
			handler.sendMessage(roadController.toJson().dump());
		}
	}
}