// Load environment variables
require("dotenv").config();

module.exports = {
  // MongoDB Configuration
  mongoDb: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "27017",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "secret",
    databaseName: process.env.DB_NAME || "flightManagement"
  },

  // JWT Authentication Config
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || "flightwillnotdelay"
  },

  // Task Scheduler Settings
  tasks: {
    createFlightInterval:
      parseInt(process.env.CREATE_FLIGHT_INTERVAL, 10) || 10000,
    updateFlightInterval:
      parseInt(process.env.UPDATE_FLIGHT_INTERVAL, 10) || 20000
  },

  // Kafka Messaging Configuration
  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID || `kafka-client-${Date.now()}`,
    host: process.env.KAFKA_HOST || "localhost",
    port: process.env.KAFKA_PORT || 9092,
    externalPort: process.env.KAFKA_EXTERNAL_PORT || 9092,
    wsClientId: process.env.WS_KAFKA_CLIENT_ID || "ws-kafka-client"
  },

  // Redis Cache Configuration
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    username: process.env.REDIS_USERNAME || "default",
    password: process.env.REDIS_PASSWORD || "secret",
    database: process.env.REDIS_DATABASE || "0",
    enableUserGet: process.env.REDIS_USER_GET_ENABLED === "true",
    enableUserSet: process.env.REDIS_USER_SET_ENABLED === "true",
    userPrefix: process.env.REDIS_USER_PREFIX || 1
  },

  webSocket: {
    host: process.env.WS_HOST || "localhost",
    port: process.env.WS_PORT || 8080
  }
};
