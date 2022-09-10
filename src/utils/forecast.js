/** @format */

const request = require('request');

const weatherstack = (lat, lon, callback) => {
	let url = `http://api.weatherstack.com/current?access_key=ba53b263d6b90ec3ebbdf4c911076537&query=${lat},${lon}`;
	//({ url, json: true }, (error, response.body)
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather services!', undefined);
		} else if (body.error) {
			callback('Unable to find location!', undefined);
		} else {
			callback(
				undefined,
				'Temperature: ' +
					body.current.temperature +
					'\nFeels like: ' +
					body.current.feelslike
			);
		}
	});
};

module.exports = weatherstack;
