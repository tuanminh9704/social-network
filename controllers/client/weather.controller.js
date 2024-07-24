const axios = require("axios");

module.exports.index = async (req, res) => {
    res.render("client/pages/wheather/index", {
        pageTitle: "Thời tiết"
    })
}

