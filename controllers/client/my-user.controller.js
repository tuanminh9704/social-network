const User = require("../../models/user.model");
const Post = require("../../models/post.model");

module.exports.index = async (req, res) => {
    const myUserId = res.locals.user.id;
    // console.log(myUserId);
    const myUser = await User.findOne({
        _id: myUserId,
        deleted: false,
    }).select("-password, -token");

    const posts = await Post.find({
        user_id: myUserId,
        deleted: false,
    })

    // console.log(myUser);
    res.render("client/pages/my-user/index", {
        pageTitle: `${myUser.fullName}`,
        myUser: myUser,
        posts: posts
    });
}

module.exports.changeMyProfile = (req, res) => {
    res.send("OK");
}