const User = require("../../models/user.model");
const Chat = require("../../models/chat.model");
const RoomChat = require("../../models/room-chats.model");

const uploadCloud = require("../../helpers/uploadCloud");
const chatSocket = require("../../sockets/chat.socket");


module.exports.roomChat = async (req, res) => {
  // Lấy ra danh sachs phòng chat
  const friendsList = res.locals.user.friendList.map(user => user.user_id);

  const users = await User.find({
    _id: {$in: friendsList},
    status: "active",
    deleted: false,
  })

  // console.log(users);

  users.forEach((user) => {
    const info = res.locals.user.friendList.find(userFriend => userFriend.user_id == user.id);
    user.room_chat_id = info.room_chat_id;
  });

  res.render("client/pages/chat/room-chat", {
    users: users
  })
}

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    const roomChatId = req.params.roomChatId;
    // SocketIO
    chatSocket(req, res);
    // End SocketIO
    // Lấy data từ database

    const chats = await Chat.find({
      room_chat_id: roomChatId,
      deleted: false
    });
    for (const chat of chats) {
      const infoUser = await User.findOne({
        _id: chat.user_id
      }).select("fullName");
      chat.infoUser = infoUser;
    }

    // Lấy ra danh sachs phòng chat
    const friendsList = res.locals.user.friendList.map(user => user.user_id);

    const users = await User.find({
      _id: {$in: friendsList},
      status: "active",
      deleted: false,
    })

    // console.log(users);

    users.forEach((user) => {
      const info = res.locals.user.friendList.find(userFriend => userFriend.user_id == user.id);
      user.room_chat_id = info.room_chat_id;
    });

    const roomChat = await RoomChat.findOne({
      _id: roomChatId,
    })

    // console.log(roomChat);
    const arrUserIdInRoomChat = []
    const userInRoomChat = roomChat.users;
    userInRoomChat.forEach(user => {
      // console.log(user);
      if(user.user_id !== res.locals.user.id) {
        arrUserIdInRoomChat.push(user.user_id);
      }
    })
    // console.log(arrUserIdInRoomChat);

    if(arrUserIdInRoomChat.length == 1){
      const user = await User.findOne({
        _id: arrUserIdInRoomChat[0],
      })
      // console.log(user);
      roomChat.title = user.fullName;
    }
    else{
      let stringNameRoomChat = "";
      for (const id of arrUserIdInRoomChat) {
        const user = await User.findOne({
          _id: id
        })
        stringNameRoomChat += user.fullName;
        stringNameRoomChat += ", "
      }
      stringNameRoomChat.slice(0, -1);
      roomChat.title = stringNameRoomChat;
    }


    // console.log(arrFriend);
    // Hết Lấy data từ database
    res.render("client/pages/chat/index", {
      pageTitle: "Chat",
      chats: chats,
      users: users,
      roomChat: roomChat
    });
};
