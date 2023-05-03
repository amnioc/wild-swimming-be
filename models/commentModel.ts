const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    minLength: 2,
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
  },

  created_at: { type: Date, default: new Date() },
  votes: { type: Number, default: 0 },
  location_id: { type: String, required: true, minLength: 2 },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

// export {};
