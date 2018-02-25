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

  rl.on("pause", async () => {
    for (let item of lineBuffer) {
      let geocode = await geocodeService(item);
      if (geocode) console.log(geocode);
    }
    rl.resume();
  });
};
