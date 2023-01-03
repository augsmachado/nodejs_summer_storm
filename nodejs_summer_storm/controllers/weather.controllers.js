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
					const weather = $("div[class=nawv0d]", "#wob_wc");

					/**
					 * Não é possível pegar os dados do google weather utilizando essa estrategia
					 * é necessário repensar e/ou descobri outro site ao qual possamos fazer o scraper
					 * dos dados climáticos
					 */

					let now = [];
					const weather_now = $(
						"div[wob_dcp] > span",
						"#wob_dc"
					).text();

					console.log(weather_now);
					now.push({
						city: city,
						weather_now: weather_now,
					});

					res.json({
						msg: "success",
						weather: now,
					});
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
