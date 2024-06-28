const User = require("../../models/user.model");
const Post = require("../../models/post.model");
const uploadCloud = require("../../helpers/uploadCloud");

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

//[PATCH] /my-profile/edit/:id
module.exports.changeMyProfilePatch = async (req, res) => {
    // console.log(req.body.homeTown);
    const avatarUpload = req.files['avatar'] ? req.files['avatar'][0] : null;
    const coverPhotoUpload = req.files['cover-photo'] ? req.files['cover-photo'][0] : null;
    const avatarUrl = await uploadCloud(avatarUpload.buffer);
    const coverPhotoUrl = await uploadCloud(coverPhotoUpload.buffer);    
    // console.log(avatarUrl.url);
    // console.log(coverPhotoUrl.url);

    req.body.avatar = avatarUrl.url;
    req.body.photoCover = coverPhotoUrl.url;

    console.log(req.body);
    await User.updateOne({
        _id: res.locals.user.id,
    }, req.body);
    res.redirect("back");
}