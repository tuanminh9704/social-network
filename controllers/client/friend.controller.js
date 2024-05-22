const User = require("../../models/user.model");

module.exports.index = (req, res) => {
    res.render("client/pages/friends/index", {
        pageTitle: "Bạn bè"
    });
}

module.exports.suggestions = async (req, res) => {
    const userId = res.locals.user.id;
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