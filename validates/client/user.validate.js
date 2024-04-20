module.exports.checkUser = (req, res, next) => {
    if(!req.body.email) {
        req.flash("error", "Email không được để trống!");
        res.redirect(back);
        return;
    }
    if(!req.body.password) {
        req.flash("error", "Mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.fullName) {
        req.flash("error", "Họ tên không được để trống!");
    }
    next();
}

module.exports.checkLogin = (req, res, next) => {
    if(!req.body.email) {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.password) {
        req.flash("error", "Mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }
    next();
}


module.exports.validateForgotPassword = (req, res, next) => {
    if(!req.body.email) {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }
    next();
}

module.exports.validateOtp = (req, res, next) => {
    if(!req.body.email) {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.otp) {
        req.flash("error", "OTP không được để trống!");
        res.redirect("back");
        return;
    }
    next();
}

module.exports.validateResetPassword = (req, res, next) => {
    if(!req.body.password) {
        req.flash("error", "Mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.confirmPassword) {
        req.flash("error", "Vui lòng xác nhận mật khẩu!");
        res.redirect("back");
        return;
    }

    next();
}