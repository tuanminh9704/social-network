module.exports.index = (req, res) => {
    res.render("client/pages/wheather/index", {
        pageTitle: "Thời tiết"
    })
}