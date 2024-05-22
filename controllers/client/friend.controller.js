const User = require("../../models/user.model");

module.exports.index = (req, res) => {
    res.render("client/pages/friends/index", {
        pageTitle: "Bạn bè"
    });
}

module.exports.suggestions = async (req, res) => {
    const userId = res.locals.user.id;
    _io.once("connection", (socket)  => {
        socket.on("CLIENT_ADD_FRIEND", async (data) => {
            const users = await User.findOne({
                _id: userId
            })

            // console.log(users);
            await users.updateOne({
                $push: {requestFriend: data}
            })
        })
    })
    const users = await User.find({
        _id: {$ne: userId}
    }).select("fullName avatar");

    // console.log(users);
    // console.log(userId);
    res.render("client/pages/friends/suggestions", {
        pageTitle: "Gợi ý kết bạn",
        users: users
    })
}