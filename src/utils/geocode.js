const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoicml0aWtqYWlucmoiLCJhIjoiY2tqanY0ZnppNTliajJxcGR1Mzd0c2xlOSJ9.25xL3jbSMBBDBOlPolsGxA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Location API!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the Location", undefined);
    } else {
      const latitude = body.features[0].center[0];
      const longitude = body.features[0].center[1];
      const place = body.features[0].place_name;
      callback(undefined, { latitude, longitude, place });
    }
  });
};

module.exports = geocode;
