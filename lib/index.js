const fs = require("fs");
const readline = require("readline");

const config = require("../config");

const rl = readline.createInterface({
  input: fs.createReadStream(config.inputFile),
  crlfDelay: Infinity
});

rl.on("line", line => {
  console.log(`Line from file: ${line}`);
});
