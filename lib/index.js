const fs = require("fs");
const path = require("path");
const readline = require("readline");

const { inputFile } = require("../config");
const geocodeService = require("./geocode_service");

const rl = readline.createInterface({
  input: fs.createReadStream(path.resolve("input", inputFile)),
  crlfDelay: Infinity
});

let lineBuffer = [];

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
