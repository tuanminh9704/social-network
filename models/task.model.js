const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    user_id: String,
    description: {
      type: String,
      required: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    dueDate: {  //Ngày hết hạn
      type: Date,
      required: false,
    },
    priority: {   // Mức độ ưu tiên
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {  
      type: String,
      enum: ['not started', 'in progress', 'completed'],
      default: 'not started',
    },
    assignedTo: {   // Người được giao
      type: Array,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });


const Task = mongoose.model("Task", taskSchema, "tasks");

module.exports = Task;
  