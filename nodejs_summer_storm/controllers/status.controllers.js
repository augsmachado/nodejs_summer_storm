const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

// Define .env config
dotenv.config();

class StatusController {
	static async getStatusAPI(req, res) {
		try {
			let status = {
				msg: "Current API status",
				name: process.env.API_NAME,
				environment: process.env.API_ENVIRONMENT,
				version: process.env.API_VERSION,
				uptime: new Date().getTime(),
				hash: uuidv4(),
			};

			res.json(status);
		} catch (err) {
			res.status(503).json({
				error: "Unable to getting API status",
				details: `${err}`,
			});
		}
	}
}

module.exports = StatusController;
