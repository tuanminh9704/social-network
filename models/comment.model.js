const mongoose = require("mongoose");

// Định nghĩa schema cho comment
const commentSchema = new mongoose.Schema(
  {
    post_id: String, // ID của bài đăng mà comment thuộc về
    user_id: String, // ID của người dùng đăng comment
    content: String, // Nội dung comment
    created_at: { type: Date, default: Date.now }, // Thời điểm tạo comment
    deleted: {
      type: Boolean,
      default: false, // Mặc định chưa bị xóa
    },
    deletedAt: Date, // Thời điểm bị xóa (nếu bị xóa)
  }
);

// Tạo model từ schema
const Comment = mongoose.model("Comment", commentSchema, "comments");

module.exports = Comment;
