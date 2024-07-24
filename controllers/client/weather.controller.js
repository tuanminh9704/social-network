const axios = require("axios");

//[GET] /wheather
module.exports.index = async (req, res) => {
    res.render("client/pages/wheather/index", {
        pageTitle: "Thời tiết"
    })
}

//[GET] /wheather/check
module.exports.checkWeather = async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    // console.log(lat);
    const openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather";
    const apiKey = process.env.OPEN_WHEATHER_MAP_KEY;
    const response = await axios.get(openWeatherUrl, {
        params: {
          lat: lat,
          lon: lon,
          appid: apiKey,
          units: 'metric' // Sử dụng 'metric' để lấy nhiệt độ theo độ C
        }
    });

    const dataWeather = response.data;
    // console.log(dataWeather);
      res.json({
        code: 200,
        message: "success",
        dataWeather: dataWeather
      });
    
}
