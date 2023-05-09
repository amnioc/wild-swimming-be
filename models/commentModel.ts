export {};

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: "Please enter a comment",
    minLength: 2,
    default: "Comment Body Here",
  },
  name: {
    type: String,
    required: "Please enter your name",
    minLength: 2,
    default: "swimmer_name",
  },

  created_at: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
  location_id: {
    type: String,
    required: true,
    minLength: 2,
    default: "id_incoming",
  },
});

module.exports = mongoose.model("Comments", commentSchema);
