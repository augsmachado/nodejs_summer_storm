const express = require("express");
const dotenv = require("dotenv");

const NodeCache = require("node-cache");

const status = require("./routes/status.routes.js");
const weather = require("./routes/weather.routes.js");

// Define .env config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Define node caching settings
// stdTTL define the standard ttl for every generated cache element in seconds
// checkperiod is used for the automatic delete check interval
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const verifyCache = (req, res, next) => {
	try {
		const { id } = req.params;
		if (cache.has(id)) {
			return res.status(200).json(cache.get(id));
		}
		return next();
	} catch (err) {
		throw new Error(err.message);
	}
};

app.use(express.json());

// Define action routes
app.use("/", status);
app.use("/weather", verifyCache, weather);

// Define action to undefined route
app.use("*", (req, res) => {
	res.status(404).json({
		error: "Not route found",
	});
});

app.listen(PORT, () => {
	try {
		console.log(`Server running on port: ${PORT}`);
	} catch (err) {
		res.status(503).json({ error: err });
		process.exit(1);
	}
});

module.exports = app;
