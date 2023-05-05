//connect and listen

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("../app.ts");
dotenv.config({ path: "./.env.development" });

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err) => console.log(err));

app.listen("5050", () => {
  console.log("Server running on port 5050");
});
