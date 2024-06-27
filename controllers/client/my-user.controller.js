const User = require("../../models/user.model");
const Post = require("../../models/post.model");

//[GET] /my-profile/:id
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

//[GET /my-profile/edit/:id
module.exports.changeMyProfile = async (req, res) => {
    const myUserId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: myUserId,
        deleted: false,
    })
    res.render("client/pages/my-user/edit-profile", {
        myUser: myUser,
        pageTitle: "Chỉnh sửa trang cá nhân"
    })
}