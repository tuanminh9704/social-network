const moment = require("moment");


module.exports.convertTime = (time) => {
    return moment(time).format("DD/MM/YYYY HH:mm:ss");
}

module.exports.convertDate = (time) => {
    return moment(time).format("DD/MM/YYYY");
}