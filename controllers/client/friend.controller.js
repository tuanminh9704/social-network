const User = require("../../models/user.model");

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
    const users = await User.find({
        // _id: {$ne: userId}
        $and: [
            {_id: {$ne: userId}},
            {_id: {$nin: requestFriends}}, 
            {_id: {$nin: acceptFriends}} 
          ],

    }).select("fullName avatar");

    // console.log(users);
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