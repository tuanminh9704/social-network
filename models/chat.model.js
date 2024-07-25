const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        user_id: String,
        room_chat_id: String,
        content: String,
        like: Number,
        // comment: [
        //     {
        //         user_id: String,
        //         content: Array,
        //     }
        // ],
        coord: {
            longitude: String,
            latitude: String,
        },
        images: Array,
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

const Chat = mongoose.model("Chat", chatSchema, "chats");

module.exports = Chat;