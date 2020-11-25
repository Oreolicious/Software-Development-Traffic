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

bool SocketHandler::waitForClient(u_short port)
{
	initializeListeningSocket(port);
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

bool SocketHandler::sendMessage(std::string message)
{
	message = std::to_string(message.length()) + ":" + message;
	buffer buf;
	strcpy_s(buf, message.c_str());
	send(clientSocket, buf, message.length(), 0);
	utility::setConsoleColor(11);
	std::cout << utility::timestamp() << "Sent: " << message << std::endl;
	utility::setConsoleColor(7);
	return true;
}

bool SocketHandler::hasClient()
{
	return clientSocket != INVALID_SOCKET;
}

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

void SocketHandler::initializeWinsock()
{
	// Initialze winsock
	WSADATA wsData;
	WORD ver = MAKEWORD(2, 2);

	int wsOk = WSAStartup(ver, &wsData);
	if (wsOk != 0)
	{
		utility::setConsoleColor(12);
		std::cerr << utility::timestamp() << "Can't Initialize winsock! Quitting" << std::endl;
		utility::setConsoleColor(7);
		return;
	}
}

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
	hint.sin_addr.S_un.S_addr = INADDR_ANY; // Could also use inet_pton .... 

	bind(listening, (sockaddr*)&hint, sizeof(hint));

	// Tell Winsock the socket is for listening 
	listen(listening, SOMAXCONN);
}