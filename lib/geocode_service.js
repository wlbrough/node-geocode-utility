const config = require("../config");
const compliantGeocode = require("./check_geocode");
const request = require("./https_request");
const baseApiUri = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const keyQuery = `&key=${config.apiKey}`;

const geocodeService = content => {
  return new Promise(async (resolve, reject) => {
    // Remove non-address characters from the line feed
    let stripped = content.replace(/[^\w\d\s,.-]/g, "");
    let apiUri = `${baseApiUri}${encodeURIComponent(stripped)}${keyQuery}`;

    try {
      let response = await request(apiUri);
      resolve(compliantGeocode(response));
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = geocodeService;
