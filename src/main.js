// Import required modules
const express = require("express");
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
app.use("/api/task1", require("./routes/task1.routes"));

app.use("/api/health", (req, res) => {
  res.json({ status: "UP" });
});


// Start the server and listen on the specified port
const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
