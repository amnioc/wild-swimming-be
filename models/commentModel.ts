const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    // validate: {
    //   validator: (val: string) => val.length > 5,
    //   message: "username must be move than 5 characters",
  },

  created_at: Date,
  votes: Number,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

// export {};
