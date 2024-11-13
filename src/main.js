// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const { connectToMongo } = require("./mongo");
const flightRouteHandler = require("./routes/flight.routes");
const userRouteHandler = require("./routes/user.routes");
const { kafkaClient } = require("./kafka/kafka-init");
const { init } = require("./kafka/producer");
const cors = require("cors");

// Load environment variables from the .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up Cross-Origin Resource Sharing (CORS) settings
const corsConfig = {
  origin: "*",
  credentials: true
};
app.use(cors(corsConfig));

// Connect to MongoDB database
connectToMongo();

// Connect to Kafka Producer
require("./socket");

// Initialize Kafka Producer
init();

// Load flight-related tasks
require("./tasks/flight.task");

// Define API routes
app.use("/api/flights", flightRouteHandler);
app.use("/api/users", userRouteHandler);
app.use("/api/task1", require("./routes/task1.routes"));

app.use("/api/health", (req, res) => {
  res.json({ status: "UP" });
});

// Handle graceful shutdown on SIGTERM signal
process.on("SIGTERM", async () => {
  try {
    console.log("Received SIGTERM: Starting graceful shutdown process...");

    await kafkaClient.disconnectProducer();

    console.log("SIGTERM: Graceful shutdown completed. Exiting application...");
    process.exit(0);
  } catch (err) {
    console.error("SIGTERM: Error occurred during shutdown:", err);
    process.exit(1);
  }
});

// Handle graceful shutdown on SIGINT signal (e.g., Ctrl+C)
process.on("SIGINT", async () => {
  try {
    console.warn("Received SIGINT: Starting graceful shutdown process...");

    await kafkaClient.disconnectProducer();

    console.warn("SIGINT: Graceful shutdown completed. Exiting application...");
    process.exit(0);
  } catch (err) {
    console.error("SIGINT: Error occurred during shutdown:", err);
    process.exit(1);
  }
});

// Start the server and listen on the specified port
const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
