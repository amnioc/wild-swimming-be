// export {};

const mongoose = require("mongoose");
const Comments = require("../../models/commentModel.ts");
const seedComments = require("../data/test-data.ts");
require("dotenv").config({
  path: "./.env.development",
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err) => console.log(err));

// const seedComments = [
//   {
//     name: "swimmer123",
//     body: "love a swim I do",
//   },
//   {
//     name: "water_baby",
//     body: "beautiful surroundings",
//     location_id: "ukd5400-40750",
//   },
//   {
//     name: "nature_lover",
//     body: "best swim yet! strong recommend",
//   },
//   {
//     name: "nature_lover",
//     body: "wow, love it",
//   },
//   {
//     name: "swimmerIam",
//     body: "great day out",
//   },
//   {
//     name: "swimmer123",
//     body: "unreal! loved my time there",
//   },
//   {
//     name: "riversAreFun",
//     body: "went with friends, was great",
//   },
//   {
//     name: "nature_lover",
//     body: "the fly tipping made me sad",
//   },
//   {
//     name: "loverNature",
//     body: "the sights! the trees!",
//   },
//   {
//     name: "swimmerIam",
//     body: "strong recommend",
//   },
// ];

const seedDB = async () => {
  await Comments.deleteMany({}); //drop pre-existing
  await Comments.insertMany(seedComments);
  console.log("seeded");
};

seedDB().then(() => {
  mongoose.connection.close();
});

module.exports = { seedDB };
