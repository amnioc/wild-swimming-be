export {};

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_id: { type: String, required: true, minLength: 2, default: "unknown" },
  avatar_url: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1682685797168-613fd0cae41d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  name: {
    type: String,
    required: "Please enter your name",
    minLength: 2,
    // default: "swimmer_name",
  },
  body: {
    type: String,
    required: "Please enter a comment",
    minLength: 2,
    // default: "Comment Body Here",
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
