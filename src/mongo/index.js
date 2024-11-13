const config = require("../configs");
const dotenv = require("dotenv");

dotenv.config();

exports.connectToMongo = () => {
  const mongoose = require("mongoose");

  // const mongoURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  const mongoURI = `mongodb://${config.mongoDb.host}:${config.mongoDb.port}/${config.mongoDb.databaseName}?authSource=admin`;

  console.log(mongoURI);
  mongoose
    .connect(mongoURI)
    .then(async () => {
      console.log("Connected to MongoDB");
    })
    .catch(err => {
      console.error("Error connecting to MongoDB:", err);
    });
};
