const Post = require("../../models/post.model");
const User = require("../../models/user.model");
const Comment = require("../../models/comment.model");
const uploadCloud = require("../../helpers/uploadCloud");
const { unsubscribe } = require("../../routes/client/home.route");
const { friendList } = require("./friend.controller");

module.exports.index = async (req, res) => {
    const posts = await Post.find();
    const myUser = await User.findOne({
        _id: res.locals.user.id
    })
    for (const post of posts) {
        const user = await User.findOne({
            _id: post.user_id,
        })
        const comment = await Comment.find({
            post_id: post._id,
        })
        post.commentTotal = comment.length;
        // console.log(comment);
        post.author = user.fullName;
        post.authorAvatar = user.avatar;
    }


    const arrayFriendList = [];
    myUser.friendList.forEach(friend => {
        // console.log(friend);
        arrayFriendList.push(friend.user_id);
    });
    // console.log(arrayFriendList);
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        posts: posts,
        arrayFriendList: arrayFriendList,
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

//[PATCH] /post/like/:status/:postId
module.exports.like = async (req, res) => {
    const status = req.params.status;
    const postId = req.params.postId;

    const post = await Post.findOne({
        _id: postId,
        deleted: false,
    })

    const updateLike = status == "like" ? post.like + 1 : post.like - 1;

    await Post.updateOne({
        _id: postId,
        deleted: false,
      }, {
        like: updateLike
      });
      res.json({
        code: 200,
        message: "Đã like",
        like: updateLike
      });
}

//[GET] /post/comment/:postId
module.exports.getComment = async (req, res) => {
    const postId = req.params.postId;
    // console.log(postId);
    const post = await Post.findOne({
        _id: postId
    })
    const arrayUserIdComment = [];
    const comments = await Comment.find({
        post_id: postId,
    })
   
    for (const comment of comments) {
        const userComment = await User.findOne({
            _id: comment.user_id,
        })
        const info = {
            fullName: userComment.fullName,
            avatar: userComment.avatar,
        }
        comment.info = info;
    }
    const author = await User.findOne({
        _id: post.user_id
    })
    res.render("client/pages/home/comment", {
        post: post,
        author: author,
        comments: comments,
        pageTitle: "Comment"
    })
}

//[POST] /post/comment/:postId
module.exports.createComment = async (req, res) => {
    const content = req.body.comment;    
    const postId = req.params.postId;
    const userId = res.locals.user.id;

    const myuser = await User.findOne({
        _id: userId,
    })

    const data = {
        content: content,
        postId: postId,
        userId: userId,
        avatar: myuser.avatar,
        fullName: myuser.fullName
    }

    const comment = new Comment({
        post_id: postId,
        user_id: userId,
        content: content
    })
    await comment.save();
    
    res.json({
        code: 200,
        message: "Comment thành công!",
        data: data,
    })
    
}