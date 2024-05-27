const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot.model");
const md5 = require("md5");

const genarateHelper = require("../../helpers/genarate");
const sendMailHelper = require("../../helpers/sendMail");


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

    // console.log(infoUser);
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

//[POST] /user/password/forgot
module.exports.forgotPost = async (req, res) => {
    const email = req.body.email;
    const existUser = await User.findOne({
        email: email,
        deleted: false
    })
    
    if(!existUser) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    const otp = genarateHelper.randomNumber(6);

    // console.log(otp);

    const recordsForgotPassword = {
        email: email,
        otp: otp,
        expiresAt: new Date(Date.now() + 30 * 1000)
    };

    const forgotPassword = new ForgotPassword(recordsForgotPassword);

    const subject = `Mã xác thực otp`;
    const html = `Mã xác thực otp của bạn là: <b>${otp}</b>. Yêu cầu không tiết lộ otp để tránh mất tài khoản`;

    sendMailHelper.sendMail(email, subject, html);

    await forgotPassword.save();

    res.redirect(`/user/password/otp?email=${email}`);
    
}

//[GET] /user/password/otp
module.exports.submitOtp = (req, res) => {
    const email = req.query.email;
    // console.log(email);
    res.render("client/pages/user/otp", {
        email: email,
        pageTitle: "Xác thực otp"
    });
}

//[POST] /user/password/otp
module.exports.submitOtpPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp
    // console.log(email);
    // console.log(otp);
    const checkEmail = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })

    const user = await User.findOne({
        email: email,
    })

    if(!checkEmail) {
        req.flash("error", "Mã OTP không chính xác!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");

}

//[GET] /user/password/reset
module.exports.resetPassword = (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Thay đổi mật khẩu"
    })
}

//[POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    const tokenUser = req.cookies.tokenUser;
    const newPassword = req.body.password;
    const confirmPasssord = req.body.confirmPassword;

    if(newPassword !== confirmPasssord) {
        req.flash("error", "Mật khẩu không trùng khớp vui lòng kiểm tra lại!");
        res.redirect("back");
        return;
    }

    await User.updateOne({tokenUser: tokenUser}, {password: md5(newPassword)});

    res.redirect("/");
}