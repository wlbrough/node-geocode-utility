const https = require("https");

const config = require("../config");
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

const geocodeService = async content => {
  return new Promise((resolve, reject) => {
    let stripped = content.replace(/[^\w\d\s,.]/g, "");
    let apiUri = `${baseApiUri}${encodeURIComponent(stripped)}${keyQuery}`;
    setTimeout(() => {
      https
        .get(apiUri, res => {
          if (res.statusCode !== 200) reject(new Error("Invalid response"));

          res.setEncoding("utf8");
          let rawData = "";
          res.on("data", chunk => {
            rawData += chunk;
          });
          res.on("end", () => {
            try {
              const parsedData = JSON.parse(rawData);
              resolve(compliantGeocode(parsedData));
            } catch (e) {
              console.error(e.message);
              reject(e);
            }
          });
        })
        .on("error", e => {
          console.error(`Got error: ${e.message}`);
          reject(e);
        });
    }, 1000 / config.maxApiCallsPerSecond);
  });
};

module.exports = geocodeService;
