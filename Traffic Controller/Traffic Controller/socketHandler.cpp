#include "socketHandler.h"

SocketHandler::SocketHandler()
{
	listening = INVALID_SOCKET;
	clientSocket = INVALID_SOCKET;
	initializeWinsock();
}

SocketHandler::~SocketHandler()
{
	if (listening != INVALID_SOCKET) { closesocket(listening); }
	if (clientSocket != INVALID_SOCKET) { closesocket(clientSocket); }
	WSACleanup();
}

/// <summary>
/// Wait for a new client to connect to the listening socket.
/// When there's a succesful connection the connection gets bound to a new socket called clientSocket
/// </summary>
/// <param name="port">The port on which to listen for new clients</param>
/// <returns>Returns true if client has succesfully been bound to client socket, else return false</returns>
bool SocketHandler::waitForClient(u_short port)
{
	initializeListeningSocket(port); // Create listening socket
	// Wait for a connection
	sockaddr_in client;
	int clientSize = sizeof(client);

	clientSocket = accept(listening, (sockaddr*)&client, &clientSize);
	if (clientSocket == INVALID_SOCKET) {
		utility::setConsoleColor(12);
		std::cerr << utility::timestamp() << "Error when connecting to client" << std::endl;
		utility::setConsoleColor(7);
		return false;
	}

	ZeroMemory(host, NI_MAXHOST); // same as memset(host, 0, NI_MAXHOST);
	ZeroMemory(service, NI_MAXSERV);

	// Get hostname info
	if (getnameinfo((sockaddr*)&client, sizeof(client), host, NI_MAXHOST, service, NI_MAXSERV, 0) == 0)
	{
		utility::setConsoleColor(10);
		std::cout << utility::timestamp() << host << " connected on port " << service << std::endl;
		utility::setConsoleColor(7);
	}
	else
	{
		inet_ntop(AF_INET, &client.sin_addr, host, NI_MAXHOST);
		utility::setConsoleColor(10);
		std::cout << utility::timestamp() << host << " connected on port " <<
			ntohs(client.sin_port) << std::endl;
		utility::setConsoleColor(7);
	}

	// Close listening socket
	closesocket(listening);
	return true;
}

/// <summary>
/// Receive a message from client. Only gets triggered if hasMessage returns true
/// </summary>
/// <param name="buf">A reference to a buffer to put the new bytes on</param>
/// <param name="bytesReceived">A reference to an int for the amount of bytes in buffer</param>
/// <returns>Returns true if receiving message was sucessful, else return false</returns>
bool SocketHandler::receive(buffer& buf, int& bytesReceived)
{
	ZeroMemory(buf, 4096);

	// Wait for client to send data
	bytesReceived = recv(clientSocket, buf, MAX_BUFFER_SIZE, 0);
	if (bytesReceived == SOCKET_ERROR)
	{
		utility::setConsoleColor(12);
		std::cerr << utility::timestamp() << "Error receiving from client, closing connection" << std::endl;
		utility::setConsoleColor(7);
		closesocket(clientSocket);
		clientSocket = INVALID_SOCKET;
		return false;
	}

	if (bytesReceived == 0)
	{
		utility::setConsoleColor(12);
		std::cout << utility::timestamp()  << "Client disconnected " << std::endl;
		utility::setConsoleColor(7);
		closesocket(clientSocket);
		clientSocket = INVALID_SOCKET;
		return false;
	}
	utility::setConsoleColor(14);
	std::cout << utility::timestamp() << "Received: " << std::string(buf, 0, bytesReceived) << std::endl;
	utility::setConsoleColor(7);
	return true;
}

/// <summary>
/// Send a message to the attached client
/// </summary>
/// <param name="message">The string message to be sent</param>
bool SocketHandler::sendMessage(std::string message)
{
	message = std::to_string(message.length()) + ":" + message; // Add length header
	buffer buf;
	strcpy_s(buf, message.c_str());
	send(clientSocket, buf, message.length(), 0);
	utility::setConsoleColor(11 );
	std::cout << utility::timestamp() << "Sent: " << message << std::endl;
	utility::setConsoleColor(7);
	return true;
}

/// <summary>
/// Check if current handler has a client attached
/// </summary>
/// <returns>Returns true if clientSocket holds a valid socket connection</returns>
bool SocketHandler::hasClient()
{
	return clientSocket != INVALID_SOCKET;
}

/// <summary>
/// Check the clientSocket buffer for a new message.
/// Method pauses for specified amount of seconds to wait for a message.
/// </summary>
/// <param name="miliseconds">Amount of miliseconds to wait for a new message</param>
/// <returns></returns>
bool SocketHandler::hasMessage(u_short miliseconds)
{
	fd_set rfd;
	FD_ZERO(&rfd);
	FD_SET(clientSocket, &rfd);
	struct timeval timeout;
	timeout.tv_sec = 0;
	timeout.tv_usec = miliseconds*1000;
	int res = select(clientSocket, &rfd, nullptr, nullptr, &timeout);
	return res > 0;
}

/// <summary>
/// Initialize the windows winsock library.
/// </summary>
void SocketHandler::initializeWinsock()
{
	// Initialze winsock
	WSADATA wsData;
	WORD ver = MAKEWORD(2, 2);

	// Check if startup was succesful, otherwise stop execution
	int wsOk = WSAStartup(ver, &wsData);
	if (wsOk != 0)
	{
		utility::setConsoleColor(12);
		std::cerr << utility::timestamp() << "Can't Initialize winsock! Quitting" << std::endl;
		utility::setConsoleColor(7);
		return;
	}
}
/// <summary>
/// Create a socket that listens for clients to connect.
/// Uses the AF_INET protocol for TCP and UDP connections.
/// </summary>
/// <param name="port">Specifies the port on which new clients can bind to the listening socket</param>
void SocketHandler::initializeListeningSocket(u_short port)
{
	// Create a socket
	listening = socket(AF_INET, SOCK_STREAM, 0);
	if (listening == INVALID_SOCKET)
	{
		utility::setConsoleColor(12);
		std::cerr << utility::timestamp() << "Can't create a socket! Quitting" << std::endl;
		utility::setConsoleColor(7);
		return;
	}

	// Bind the ip address and port to a socket
	sockaddr_in hint;
	hint.sin_family = AF_INET;
	hint.sin_port = htons(port);
	hint.sin_addr.S_un.S_addr = INADDR_ANY;

	bind(listening, (sockaddr*)&hint, sizeof(hint));

	// Tell Winsock the socket is for listening 
	listen(listening, SOMAXCONN);
}