export {};

const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    validate: {
      validator: (val) => val <= 5 && val > 0,
    },
    required: [true, "A rating must have a number rating"],
  },
  locationId: {
    type: String,
    required: [true, "A rating must have a location ID"],
  },
  userId: {
    type: String,
    required: [true, "A rating must have a user ID"],
  },
});

const rating = mongoose.model("rating", ratingSchema);

module.exports = rating;
