const User = require("../../models/user.model");
const Task = require("../../models/task.model");

//[GET] /task
module.exports.index = async (req, res) => {
    const myUser = await User.findOne({
        _id: res.locals.user.id,
    })
    // console.log(myUser);
    const users = []; // danh sách người  dùng hiển thị lên ô check box phần tạo mới công việc
    for (const friend of myUser.friendList) {
        const user = await User.findOne({
            _id: friend.user_id,
        })
        users.push(user);
    }
    // lấy ra công việc mình giao cho người khác
    
    res.render("client/pages/tasks/index", {
        users: users,
        pageTitle: "Quản lý công việc"
    });
}


//[POST] /task/create
module.exports.createTaskPost = async (req, res) => {
    // console.log(req.body);
    req.body.user_id = res.locals.user.id;
    const task = new Task(req.body) ;
    await task.save();
    req.flash("success", "Giao việc thành công!");
    res.redirect("back");
}