// export {};

const mongoose = require("mongoose");
const Comment = require("../../models/commentModel.ts");
const { seedComments } = require("../data/test-data");
require("dotenv").config({
  path: "/home/nico/northcoders/projects/wild-swimming/wild-swimming-be/.env.development",
}); //update to your local path

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err) => console.log(err));

const seedDB = async () => {
  await Comment.deleteMany({}); //drop pre-existing
  await Comment.insertMany(seedComments);
  console.log("seeded");
};

seedDB().then(() => {
  mongoose.connection.close();
});

module.exports = seedDB;
