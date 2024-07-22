const axios = require("axios");

module.exports.index = async (req, res) => {
    // console.log(req.query);  
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const apiKey = process.env.OPEN_WHEATHER_MAP_KEY;
    console.log(apiKey);
    
    const wheatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            lat: latitude,
            lon: longitude,
            appid: apiKey,
            units: 'metric' // Để lấy dữ liệu nhiệt độ theo độ C, bạn có thể thay đổi thành 'imperial' cho độ F
        }
    });
    console.log(wheatherData);
    res.render("client/pages/wheather/index", {
        pageTitle: "Thời tiết"
    })
}

