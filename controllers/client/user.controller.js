const User = require("../../models/user.model");
const md5 = require("md5");

const genarateHelper = require("../../helpers/genarate");

//[GET] /user/login
module.exports.login = (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    })
}

//[POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;

    const existUser = await User.findOne({
        email: email,
        // deleted: false
    })

    if(!existUser){
        req.flash("error", "Email hoặc mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }

    if(existUser.status !== "active"){
        req.flash("error", "Tài khoản bị khóa!");
        res.redirect("back");
        return;
    }

    if(md5(req.body.password) !== existUser.password){
        req.flash("error", "Email hoặc mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }

    if(existUser.status == "inactive"){
        req.flash("error", "Tài khoản của bạn đã bị khóa!");
        res.redirect("back");
        return;
    }
    // console.log(existUser.tokenUser);
    res.cookie("tokenUser", existUser.tokenUser);
    res.redirect("/");

}

//[GET] /user/register
module.exports.register = (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng kí tài khoản"
    })
}

//[POST] /user/register
module.exports.registerPost = async (req, res) => {
    // console.log(req.body);
    const existUser = await User.findOne({
        email: req.body.email,
        deleted: false
    })
    if(existUser) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }
    const tokenUser = genarateHelper.randomString(30);

    const infoUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        tokenUser: tokenUser,
    }

    console.log(infoUser);
    const user = new User(infoUser);

    await user.save();
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/user/login");
}

// [GET] /user/logout
module.exports.logout = (req, res) => {
    const tokenUser = res.cookie.tokenUser;
    res.clearCookie("tokenUser");
    res.redirect("/user/login")
}

//[GET] /user/password/forgot
module.exports.forgot = (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Quên mật khẩu"
    })
}