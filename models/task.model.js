const mongoose = require("mongoose");

const TaskSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
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
  