const Post = require("../../models/post.model");
const uploadCloud = require("../../helpers/uploadCloud");
const { unsubscribe } = require("../../routes/client/home.route");

module.exports.index = async (req, res) => {
    const posts = await Post.find();
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        posts: posts
    });
}

// [POST] /post/create
module.exports.createPost = async (req, res) => {
    const content = req.body.title;
    const image = req.body.thumbnail.url;
    const user_id = res.locals.user.id;
    const post =  new Post({
        user_id: user_id,
        content: content,
        like: 0,
        image: image
    });
    await post.save();
    
    res.redirect("back");
}