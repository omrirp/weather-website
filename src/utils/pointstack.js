/** @format */

const request = require('request');

const poinstack = (adress, callback) => {
  let url = `http://api.positionstack.com/v1/forward?access_key=1ba3537271993cc2f4819cf8dfddf2d8&query=
	${encodeURIComponent(adress)}`;
  //({ url, json: true }, (error, response.body)
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (!body.data[0]) {
      callback('Unable to find location. Please try again!', undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].name + ' ' + body.data[0].country_code,
      });
    }
  });
};

module.exports = poinstack;
