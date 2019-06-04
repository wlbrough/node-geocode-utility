const fs = require("fs");
const path = require("path");
const readline = require("readline");

const geocodeService = require("./geocode_service");

module.exports = config => {
  const { apiKey, inputFile } = config;
  if (!apiKey) throw new Error("Google Geocode Service API Key Required");

  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve("input", inputFile)),
    crlfDelay: Infinity
  });

  let lineBuffer = [];

  /*
   * rl.pause() pauses at the byte-stream level and not the line level.
   * In order to maintain the 50 request/sec limit, each chunk is buffered
   * and processed before resuming the stream.
   */
  rl.on("line", async line => {
    lineBuffer.push(line);
    rl.pause();
  });

  // setInterval is used to ensure calls to the Geocoding API do not exceed
  // the limit of 50 requests/second
  rl.on("pause", async () => {
    let idx = 0;
    const interval = setInterval(() => {
      try {
        geocodeService(lineBuffer[idx++]).then(geocode => {
          if (geocode) console.log(geocode);
        });
      } catch (e) {
        console.error(e);
      }
      if (idx >= lineBuffer.length) {
        clearInterval(interval);
        lineBuffer = [];
        rl.resume();
      }
    }, 1000 / config.maxApiCallsPerSecond);
  });
};
