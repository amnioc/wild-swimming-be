export {};

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./.env.dev" });

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err: any) => console.log(err));

app.listen("5050", () => {
  console.log("Server running on port 5050");
});
