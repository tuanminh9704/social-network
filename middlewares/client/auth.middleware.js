const User = require("../../models/user.model");

module.exports.auth = async (req, res, next) => {
    // console.log("chạy qua đây")
    if(!req.cookies.tokenUser) {
        res.redirect("/user/login");
        return;
    }
    else{
        const tokenUser = req.cookies.tokenUser;
        const existUser = await User.findOne({
            tokenUser: tokenUser,
            deleted: false
        })
        if(!existUser) {
            res.redirect("/user/login");
            return
        }
        next();
    }
}