const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client//weather.controller");

router.get("/", controller.index);

router.get("/check", controller.checkWeather);

module.exports = router;