const User = require("../../models/user.model");
const Chat = require("../../models/chat.model");

module.exports.index = async(req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // console.log(userId);
    _io.once('connection',  (socket) => {
        socket.on("CLIENT_SEND_MESSAGE_TO_SERVER", async (content) => {
            // console.log(content);
            const chat = new Chat({
                user_id: userId,
                content: content,
            })
            // console.log(content);
            await chat.save();
            socket.emit("SEVER_RETURN_MESSAGE_TO_CLIENT", {
                userId: userId,
                fullName: fullName,
                content: content
            })
        })
      });

    const chats = await Chat.find({
        deleted: false,
    })

    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id,
        }).select("fullName")
        // console.log(inforUser);
        chat.infoUser = infoUser;
    }
    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats,
    });
}