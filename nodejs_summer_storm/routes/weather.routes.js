const express = require("express");

const WeatherCtrl = require("../controllers/weather.controllers.js");

const router = express.Router();

router.route("/now").get(WeatherCtrl.getWeatherNow);
router.route("/temperature").get(WeatherCtrl.getTemperature);
router.route("/precipitation").get(WeatherCtrl.getPrecipitation);
router.route("/wind").get(WeatherCtrl.getWind);

module.exports = router;
