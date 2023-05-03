const { MongoClient } = require("mongodb");
const ENV = process.env.NODE_ENV || "development";
const dotenv = require("dotenv");

const pathToCorrectEnvFile = `/home/nico/northcoders/projects/wild-swimming/wild-swimming-be/.env.${ENV}`;

MongoClient.connect(process.env.DATABASE_URL, { maxPoolSize: 50 }).catch(
  (err) => {
    console.log(error);
  }
);

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        max: 2,
      }
    : {};

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

// const connection = new MongoClient(config);

module.exports = { pathToCorrectEnvFile };
