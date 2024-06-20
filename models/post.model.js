const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user_id: String,
    content: String,
    like: Number,
    image: String,
    status: {
      type: String,
      default: "active"
    },
    created_at: { type: Date, default: Date.now },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema, "posts");

module.exports = Post;