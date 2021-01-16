const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=f4ebd96d415550a2ececc550073d3af0&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather API!", undefined);
    } else if (body.error) {
      callback("Unable to find Location.");
    } else {
      const weather = body.current.weather_descriptions[0];
      const temperature = body.current.temperature;
      callback(undefined, { weather, temperature });
    }
  });
};

module.exports = forecast;
