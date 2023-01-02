const dotenv = require("dotenv");
const axios = require("axios");
const cheerio = require("cheerio");

const { v4: uuidv4 } = require("uuid");

// Define .env config
dotenv.config();

class WeatherController {
	static async getWeatherNow(req, res) {
		const headers = req.headers["x-api-key"];
		const api_key = Buffer.from(headers, "base64").toString();

		const city = req.query.city.length > 0 ? req.query.city : "montreal";

		if (api_key === process.env.API_KEY) {
			try {
				const link = `${process.env.BASE_URL}+${city}`;
				console.log(link);

				axios(link).then((response) => {
					const html = response.data;
					const $ = cheerio.load(html);

					$.html();
					//const weather = $("div.nawv0d");

					console.log(html);

					let now = [];

					/*weather.each((index, element) => {
						const weather_now = $(element)
							.find("img.wob_tci")
							.attr("alt");

						now.push({
							city: city,
							weather_now: weather_now,
						});
					});

					res.json({ msg: "success", weather: now });*/
				});
			} catch (err) {
				res.status(500).json({
					error: "Unable to get today's deals from Amazon",
					details: err,
				});
			}
		} else {
			res.status(403).json({
				error: "Forbidden",
				details: "Invalid API Key",
			});
		}
	}

	static async getTemperature(req, res) {}

	static async getPrecipitation(req, res) {}

	static async getWind(req, res) {}
}

module.exports = WeatherController;
