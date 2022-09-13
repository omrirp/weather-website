/** @format */

const request = require('request');

const weatherstack = (lat, lon, callback) => {
  console.log(lat + ',' + lon);
  let url = `http://api.weatherstack.com/current?access_key=ba53b263d6b90ec3ebbdf4c911076537&query=${lat},${lon}`;
  //({ url, json: true }, (error, response.body)
  request({ url, json: true }, (error, { body }) => {
    //console.log(body);
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      console.log(body);
      callback(
        undefined,
        'Temperature: ' +
          body.current.temperature +
          '\nFeels like: ' +
          body.current.feelslike +
          '\nUV index: ' +
          body.current.uv_index +
          '\nHumidity: ' +
          body.current.humidity
      );
    }
  });
};

module.exports = weatherstack;
