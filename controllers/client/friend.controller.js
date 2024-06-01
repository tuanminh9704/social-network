const User = require("../../models/user.model");
const RoomChat = require("../../models/room-chats.model");

//[GET] /friend
module.exports.index = (req, res) => {
    res.render("client/pages/friends/index", {
        pageTitle: "Bạn bè"
    });
}

//[GET] /friends/suggestions
module.exports.suggestions = async (req, res) => {
    const userId = res.locals.user.id;
    const requestFriends = res.locals.user.requestFriend;
    const acceptFriends = res.locals.user.acceptFriend;

    // Socket
    _io.once("connection", (socket)  => {
        socket.on("CLIENT_ADD_FRIEND", async (data) => {
            // Người dùng gửi yêu cầu
            const usersRequest = await User.findOne({
                _id: userId
            })
            // Người khác đưọc nhận yêu cầu đấy
            const usersAccept = await User.findOne({
                _id: data
            })
            // server trả về id cho người đươcj nhận lời mời kết bạn
            _io.emit("SERVER_RETURN_ADD_FRIEND", {
                userId: data
            });
            // console.log(usersAccept);
            await usersRequest.updateOne({
                $push: {requestFriend: data}
            })
            await usersAccept.updateOne({
                $push: {acceptFriend: userId}
            })
        })
    })
    // End Socket 
    const users = await User.find({
        // _id: {$ne: userId}
        $and: [
            {_id: {$ne: userId}},
            {_id: {$nin: requestFriends}}, 
            {_id: {$nin: acceptFriends}},
            {'friendList.user_id': {$nin: [userId]}}
          ],

    }).select("fullName avatar");
    // console.log(userId);
    res.render("client/pages/friends/suggestions", {
        pageTitle: "Gợi ý kết bạn",
        users: users
    })
}

//[GET] /friends/accepts
module.exports.accepts = async (req, res) => {
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

    const arrayAcceptFriends = myUser.acceptFriend;

    const users = await User.find({
        _id: {$in: arrayAcceptFriends}
    })

    // console.log(users);
    res.render("client/pages/friends/accept-friend", {
        users: users,
        // arrayAcceptFriends: arrayAcceptFriends,
        pageTitle: "Lời mời kết bạn"
    })
}

//[GET] /friend/lists
module.exports.friendList = async (req, res) => {
    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId,
    })
    const arrayFriendList = myUser.friendList; // danh sách bạn bè 
    const arrayIdFriendList = arrayFriendList.map(item => item.user_id); // danh sách id bạn bè

    const users = [];
    // console.log(arrayIdFriendList);
    for (const id of arrayIdFriendList) {
        const user = await User.findOne({
            _id: id
        })
        users.push(user);
    }
    _io.on("connection", (socket) => {
        socket.on("CLIENT_SEND_ID_REFUSE_TO_SERVER", async (data) => {
            await myUser.updateOne({
                $pull: {friendList: {user_id: data}}
            })
        })
    })

    // console.log(users);
    res.render("client/pages/friends/friend-list", {
        users: users,
        pageTitle: "Danh sách bạn bè"
    })
}

//[GET] /friend/requests
module.exports.friendRequest = async (req, res) => {
    const myId = res.locals.user.id;
    // console.log(myId);
    const myUser = await User.findOne({
        _id: myId
    })

    const arrFriendRequestsId = myUser.requestFriend;
    const users = [];

    for (const id of arrFriendRequestsId) {
        const user = await User.findOne({
            _id: id
        })
        users.push(user);
    }

    _io.on("connection", (socket) => {
        socket.on("CLIENT_SEND_ID_REFUSE_REQUEST_TO_SERVER", async (data) => {
            await myUser.updateOne({
                $pull: {requestFriend: data}
            })
        })
    })

    res.render("client/pages/friends/request-friend", {
        pageTitle: "Lời mời kết bạn đã gửi",
        users: users
    })
}