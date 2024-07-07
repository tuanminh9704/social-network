const User = require("../models/user.model");
const RoomChat = require("../models/room-chats.model");

module.exports.acceptFriend = async (req, res) => {
    const userId = res.locals.user.id;

    // console.log(userId);
    const myUser = await User.findOne({
        _id: userId,
    })
// Socket
    // Chấp nhận lời mời kết bạn
    _io.on("connection", (socket) => {
        socket.on("CLIENT_SEND_ID_ACCEPT_FRIEND_TO_SERVER", async (data) => {
            // console.log(myUser);
            // console.log(data);
            const roomChat = new RoomChat({
                typeRoom: "friend",
                users: [
                  {
                    user_id: userId,
                    role: "superAdmin"
                  },
                  {
                    user_id: data,
                    role: "superAdmin"
                  }
                ],
              });

            await roomChat.save();

            await myUser.updateOne({
                $pull: {acceptFriend: data},
                $push: {
                    friendList: {
                        user_id: data,
                        room_chat_id: roomChat.id
                    }
                }
            })
            const user = await User.findOne({
                _id: data
            })
            await user.updateOne({
                $pull: {requestFriend: userId},
                $push: {
                    friendList: {
                        user_id: userId,
                        room_chat_id: roomChat.id
                    }
                }
            })
        })
    })
    
    // End chấp nhận lời mời kết bạn

    // Không chấp nhận yêu cầu
    _io.on("connection", (socket) => {
        socket.on("CLIENT_SEND_ID_ACCEPT_FRIEND_TO_SERVER", async (data) => {
            // console.log(myUser);
            await myUser.updateOne({
                $pull: {acceptFriend: data}
            })
            const user = await User.findOne({
                _id: data
            })
            await user.updateOne({
                $pull: {requestFriend: userId},
            })
        })
    })

    // End không chấp nhận yêu cầu
    // End Socket

}

module.exports.refuseFriend = async (req, res) => {
    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId,
    })
    _io.on("connection", (socket) => {
        socket.on("CLIENT_SEND_ID_REFUSE_TO_SERVER", async (data) => {
            await myUser.updateOne({
                $pull: {friendList: {user_id: data}}
            })
        })
    })
}