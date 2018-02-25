const config = require("../config");
const compliantGeocode = require("./check_geocode");
const request = require("./https_request");
const baseApiUri = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const keyQuery = `&key=${config.apiKey}`;

const geocodeService = content => {
  return new Promise((resolve, reject) => {
    // Remove non-address characters from the line feed
    let stripped = content.replace(/[^\w\d\s,.-]/g, "");
    let apiUri = `${baseApiUri}${encodeURIComponent(stripped)}${keyQuery}`;

    // setTimeout is used to ensure calls to the Geocoding API do not exceed
    // the limit of 50 requests/second
    setTimeout(async () => {
      try {
        let response = await request(apiUri);
        resolve(compliantGeocode(response));
      } catch (e) {
        reject(e);
      }
    }, 1000 / config.maxApiCallsPerSecond);
  });
};

module.exports = geocodeService;
