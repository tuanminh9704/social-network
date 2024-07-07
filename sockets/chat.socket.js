const Chat = require("../models/chat.model");

module.exports = (req, res) => {
    const userId = res.locals.user.id;
    const roomChatId = req.params.roomChatId;
    const fullName = res.locals.user.fullName;
    _io.once("connection", (socket) => {
        // Người dùng gửi tin nhắn lên server
  
        // add user vào phòng chat
        socket.join(roomChatId);
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
          const images = [];
          for (const image of data.images) {
            // console.log(image);
            const buffer = await uploadCloud(image)
            // console.log(buffer.url);
            images.push(buffer.url)
          }
          // console.log(images);
          // console.log(data.images);
          const chat = new Chat({
            room_chat_id: roomChatId,
            user_id: userId,
            content: data.content,
            images: images
          });
          await chat.save();
          // console.log(images);
          _io.to(roomChatId).emit("SERVER_SEND_MESSAGE", {
            userId: userId,
            fullName: fullName,
            content: data.content,
            images: images
          });
        });
      });
      // End SocketIO
}