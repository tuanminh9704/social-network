const User = require("../../models/user.model");

//[GET] /task
module.exports.index = async (req, res) => {
    const myUser = await User.findOne({
        _id: res.locals.user.id,
    })
    // console.log(myUser);
    const users = [];
    for (const friend of myUser.friendList) {
        const user = await User.findOne({
            _id: friend.user_id,
        })
        users.push(user);
        
    }
    res.render("client/pages/tasks/index", {
        users: users,
        pageTitle: "Quản lý công việc"
    });
}


//[POST] /task/create
module.exports.createTaskPost = (req, res) => {
    console.log(req.body);
    res.send("OK");
}