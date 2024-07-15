const User = require("../../models/user.model");
const Task = require("../../models/task.model");
const momentHelper = require("../../helpers/moment");

//[GET] /tasks
module.exports.index = async (req, res) => {
    const myUser = await User.findOne({
        _id: res.locals.user.id,
    })
    // Lấy ra công việc mình giao cho người khác
    const tasksAssignment = await Task.find({
        user_id: res.locals.user.id,
    })
    const info = [];
    // console.log(taskAssignment.assingedTo);
    for (const task of tasksAssignment) {
        const newTime = momentHelper.convertTime(task.dueDate);
        task.newTime = newTime;
        for (const id of task.assignedTo) {
            const user = await User.findOne({
                _id: id
            })
            // console.log(user);
            info.push(user.fullName);
            task.info = info;
        }
    }
    // console.log(info);
    //End  Lấy ra công việc mình giao cho người khác

    const users = []; // danh sách người  dùng hiển thị lên ô check box phần tạo mới công việc
    for (const friend of myUser.friendList) {
        const user = await User.findOne({
            _id: friend.user_id,
        })
        users.push(user);
    }
    // lấy ra công việc người khác giao cho mình

    const myTasks = await Task.find({
        assignedTo: {$in: res.locals.user.id}
    });
    for (const task of myTasks) {
        const user = await User.findOne({
            _id: task.user_id,
        })
        const newTime = momentHelper.convertTime(task.dueDate);
        task.newTime = newTime;
        task.info = user.fullName;
    }
    // const 
    // End lấy ra công việc người khác giao cho mình
    
    res.render("client/pages/tasks/index", {
        tasksAssignment: tasksAssignment,
        users: users,
        myTasks: myTasks,
        pageTitle: "Quản lý công việc"
    });
}

//[POST] /tasks/create
module.exports.createTaskPost = async (req, res) => {
    // console.log(req.body);
    req.body.user_id = res.locals.user.id;
    const task = new Task(req.body) ;
    await task.save();
    req.flash("success", "Giao việc thành công!");
    res.redirect("back");
}

//[PATCH] /tasks/success 
module.exports.taskSuccess = async (req, res) => {
    const taskId = req.params.id;
    console.log(taskId);
    await Task.updateOne({_id: taskId}, {status: "completed"});
    req.flash("success", "Hoàn thành!");
    res.redirect("back");
}   