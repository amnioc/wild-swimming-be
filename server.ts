export {};

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `${__dirname}/.env.${ENV}` });

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err: any) => console.log(err));

app.listen("5050", () => {
  console.log("Server running on port 5050");
});
