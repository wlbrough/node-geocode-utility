const https = require("https");

/*
 * Utility function to promisify https.get and parse
 * response before returning data to the calling function.
 */
const request = uri => {
  return new Promise((resolve, reject) => {
    https
      .get(uri, res => {
        if (res.statusCode !== 200) reject(new Error("Invalid response"));

        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", chunk => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
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
  });
};

module.exports = request;
