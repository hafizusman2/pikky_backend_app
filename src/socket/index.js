const { Kafka } = require("kafkajs");
const WebSocket = require("ws");

const configs = require("../configs");

// Set up WebSocket server
const wss = new WebSocket.Server({ port: configs.webSocket.port });
console.log(
  `WebSocket server is running on wss://${configs.webSocket.host}:${configs.webSocket.port}`
);

// Keep track of WebSocket clients
const clients = [];

// When a new client connects, add it to the list
wss.on("connection", ws => {
  console.log("New WebSocket client connected");
  clients.push(ws);

  // Remove client from list on disconnect
  ws.on("close", () => {
    clients.splice(clients.indexOf(ws), 1);
  });
});

// Set up Kafka
const kafka = new Kafka({
  clientId: configs.kafka.wsClientId,
  brokers: [`${configs.kafka.host}:${configs.kafka.externalPort}`]
});

const consumer = kafka.consumer({ groupId: "flight-updates-group" });

console.log("Connecting to Kafka... web socket client");

const run = async () => {
  let retries = 5;
  while (retries) {
    try {
      await consumer.connect();
      console.log("Connected to Kafka - web socket client");
      break; // If connection succeeds, break out of the loop
    } catch (error) {
      console.error("Failed to connect to Kafka, retrying...", error);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
    }
  }

  if (retries === 0) {
    console.error(
      "Could not connect to Kafka after multiple retries - web socket client"
    );
    return; // Exit if unable to connect
  }

  try {
    await consumer.subscribe({ topic: "flightCreated", fromBeginning: true });
    await consumer.subscribe({ topic: "flightUpdate", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const payload = message.value.toString();
        console.log(`Received message from Kafka topic ${topic}: ${payload}`);

        // Send the payload to all connected WebSocket clients
        clients.forEach(ws => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ topic, payload }));
          }
        });
      }
    });
  } catch (error) {
    console.error(`Error while running Kafka consumer: ${error.message}`);
  }
};

run().catch(console.error);

run().catch(console.error);
