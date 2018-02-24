const fs = require("fs");
const https = require("https");
const path = require("path");
const readline = require("readline");

const config = require("../config");
const baseApiUri = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const keyQuery = `&key=${config.apiKey}`;

const rl = readline.createInterface({
  input: fs.createReadStream(path.resolve("input", config.inputFile)),
  crlfDelay: Infinity
});

let lineBuffer = [];

const compliantGeocodes = response => {
  const { results, status } = response;
  if (status === "ZERO RESULTS") return [];
  return results.filter(r => r.geometry.location_type === "ROOFTOP");
};

const asyncLogger = async content => {
  return new Promise(resolve => {
    let stripped = content.replace(/[^\w\d\s\,\.]/g, "");
    let apiUri = `${baseApiUri}${encodeURIComponent(stripped)}${keyQuery}`;
    setTimeout(() => {
      https
        .get(apiUri, res => {
          if (res.statusCode !== 200) {
            // TODO: Handle response error
          }

          res.setEncoding("utf8");
          let rawData = "";
          res.on("data", chunk => {
            rawData += chunk;
          });
          res.on("end", () => {
            try {
              const parsedData = JSON.parse(rawData);
              const compliant = compliantGeocodes(parsedData);
              if (compliant.length > 0) console.log(compliant);
            } catch (e) {
              console.error(e.message);
            }
            resolve(true);
          });
        })
        .on("error", e => {
          console.error(`Got error: ${e.message}`);
          resolve(true);
        });
    }, 1000 / config.maxApiCallsPerSecond);
  });
};

rl.on("line", async line => {
  lineBuffer.push(line);
  rl.pause();
});

rl.on("pause", async () => {
  for (let item of lineBuffer) {
    await asyncLogger(item);
  }
  rl.resume();
});
