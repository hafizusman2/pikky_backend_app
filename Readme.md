# Flight Management System

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Setup](#setup)
   - [Clone the Repository](#1-clone-the-repository)
   - [Install Dependencies](#2-install-dependencies)
   - [Set Up Environment Variables](#3-set-up-environment-variables)
   - [Start Docker Services](#4-start-docker-services)
   - [Run the Server](#5-run-the-server)
5. [API Endpoints](#api-endpoints)
   - [Get Flights](#get-flights)
   - [Update Flight Status](#update-flight-status)
6. [Real-Time Updates with WebSocket](#real-time-updates-with-websocket)
7. [Kafka Integration](#kafka-integration)
8. [Redis Caching](#redis-caching)
9. [Contributing](#contributing)
10. [License](#license)

## Overview

This project is a Flight Management System that allows users to manage flight information, including searching for flights, updating flight statuses, and more. The system is built using Node.js, Express, and MongoDB, with Kafka for messaging and Redis for caching.

## Architecture Diagram

[Flight Management System - Task](https://excalidraw.com/#json=iTWKvErlybK657j-MyHYl,y8c8AxnWcW9O5XiP0BfjPw)

## Features

- Search for flights based on various filters (airline, flight type, status).
- Update flight statuses.
- Real-time updates using WebSocket.
- Kafka integration for messaging.
- Redis integration for caching.

## Prerequisites

- **Node.js** (v16 or higher)
- **Docker** and **Docker Compose**
- **MongoDB**
- **Kafka**
- **Redis**

## Setup

### 1. Clone the Repository

````bash
git clone git@github.com:hafizusman2/pikky_backend_app.git
cd pikky_backend_app

### 2. Install Dependencies

```bash
npm install
````

### 3. Set Up Environment Variables

Create a new file named `.env` in the root directory and copy the example.env file contents into it. Update the environment variables as needed.

### 4. Start Docker Services

- ** Valkey (Redis) **
- move valkeyy/ data tp data/valkey/ to avoid issues with permissions

```bash
docker-compose up -d
```

### 5. Run the Server

```bash
npm run start:dev
```

## API Endpoints

- **Postman Collection:** ./data/Pikky Full Stack - Technical Task.postman_collection.json

### Get Flights

- **URL:** `GET /api/flights`
- **Description:** Get a list of flights based on the specified filters.
- **Query Parameters:**
  - `airline` (optional): Filter by airline name.
  - `flightType` (optional): Filter by flight type (domestic or international).
  - `status` (optional): Filter by flight status (scheduled, delayed, cancelled, landed).
- **Response:**
  - `200 OK` on success.
  - `400 Bad Request` if any of the query parameters are invalid.
  - `500 Internal Server Error` if an error occurs on the server.

### Update Flight Status

- **URL:** `PUT /api/flights/update`
- **Description:** Update the status of a flight.
- **Request Body:**
  - `flightNumber` (required): The flight number.
  - `status` (required): The new status of the flight (scheduled, delayed, cancelled, landed).
- **Response:**
  - `200 OK` on success.
  - `400 Bad Request` if any of the request parameters are invalid
  - `404 Not Found` if the flight with the specified flight number does not exist.
  - `500 Internal Server Error` if an error occurs on the server.

## Real-Time Updates with WebSocket

The server uses WebSocket to provide real-time updates to clients. Clients can connect to the WebSocket server at `ws://localhost:8080` to receive updates whenever a flight status is updated.

## Kafka Integration

The server uses Kafka to send messages whenever a flight status is updated. The Kafka producer sends messages to the `flightUpdate` topic, and the Kafka consumer listens for messages on the same topic.

## Redis Caching

The server uses Redis to cache flight data for faster retrieval. Whenever a flight is searched for, the server first checks the cache for the flight data before querying the database.

## Contributing

Contributions are welcome! Please feel free to submit a pull request if you find any issues or would like to suggest improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
