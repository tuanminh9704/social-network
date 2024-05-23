const User = require("../../models/user.model");

module.exports.index = (req, res) => {
    res.render("client/pages/friends/index", {
        pageTitle: "Bạn bè"
    });
}

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