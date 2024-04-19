module.exports.index = (req, res) => {
    res.render("client/pages/chat/index", {
        pageTitle: "Chat"
    });
}