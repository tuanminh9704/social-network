//[GET] /user/login
module.exports.login = (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    })
}

//[POST] /user/login
module.exports.loginPost = (req, res) => {
    res.send("OK");
}

//[GET] /user/register
module.exports.register = (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng kí tài khoản"
    })
}

//[POST] /user/register
module.exports.registerPost = (req, res) => {
    console.log(req.body);
    res.send("OK")
}