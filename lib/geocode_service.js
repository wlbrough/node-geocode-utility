const config = require("../config");
const request = require("./https_request");
const baseApiUri = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const keyQuery = `&key=${config.apiKey}`;

const compliantGeocode = response => {
  const { results, status } = response;
  if (status === "ZERO RESULTS" || results.length < 1 || results.length > 1)
    return null;
  if (
    results[0].partial_match ||
    results[0].geometry.location_type !== "ROOFTOP"
  )
    return null;
  return results[0];
};

const geocodeService = content => {
  return new Promise((resolve, reject) => {
    let stripped = content.replace(/[^\w\d\s,.]/g, "");
    let apiUri = `${baseApiUri}${encodeURIComponent(stripped)}${keyQuery}`;
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
