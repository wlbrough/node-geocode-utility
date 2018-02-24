module.exports = {
  apiKey:
    process.env.GEOCODING_API_KEY || "AIzaSyAjX7GOcWUFZvGMPueHDZcI188SDOg7NMc",
  maxApiCallsPerSecond: 50,
  inputFile: "Addresses.csv",
  outputFile: "Geocode.csv"
};
