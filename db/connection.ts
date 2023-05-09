export {};

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ENV = process.env.NODE_ENV || "development";

const pathToCorrectEnvFile = `${__dirname}/../.env.${ENV}`;
dotenv.config({ path: pathToCorrectEnvFile });

mongoose
  .connect(process.env.DATABASE_URL, {
    maxPoolSize: 50,
    useNewUrlParser: true,
  })
  .catch((err) => {
    console.log(err + "<<<<<<<<<<");
  });

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        max: 50,
      }
    : {};

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

module.exports = { pathToCorrectEnvFile };
