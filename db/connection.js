const mongoose = require("mongoose");
const ENV = process.env.NODE_ENV || "development";
const dotenv = require("dotenv");
const pathToCorrectEnvFile = `./.env.${ENV}`;

dotenv.config({ path: pathToCorrectEnvFile });

mongoose
  .connect(`${process.env.DATABASE_URL}`, {
    maxPoolSize: 50,
    useNewUrlParser: true,
  })
  // .then(() => {
  //   console.log(">>>>>>>>>>" + process.env.DATABASE_URL);
  // })
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
