#include <iostream>
#include <WS2tcpip.h>
#include <string>
#include <stdexcept>

#define MAX_BUFFER_SIZE 4096

using buffer = char[MAX_BUFFER_SIZE];

#pragma comment (lib, "ws2_32.lib")
#pragma warning(disable : 4996)

class SocketHandler {
public:
	SocketHandler();
	~SocketHandler();

	bool waitForClient(u_short port);				// Get a new client for the TCP Socket
	bool receive(buffer& buf, int& bytesReceived);	// Wait for message from client
	bool sendMessage(std::string message);
	bool hasClient();								// Returns true if SocketHandler has a connected client
	bool hasMessage(u_short miliseconds);
private:
	SOCKET listening;								// Listening socket for getting new clients
	SOCKET clientSocket;							// Connected client socket

	char host[NI_MAXHOST];							// Client's remote name
	char service[NI_MAXSERV];						// Service (i.e. port) the client is connect on

	void initializeWinsock();						// Initialize windows socket
	void initializeListeningSocket(u_short port);	// Initialize the listening socket (function gets called every time a new client is requested)
};