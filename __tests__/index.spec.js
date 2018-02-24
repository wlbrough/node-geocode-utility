const processFile = require("../lib/index");

const config = {
  maxApiCallsPerSecond: 50,
  inputFile: "Addresses.csv",
  outputFile: "Geocode.csv"
};

const configWithKey = {
  ...config,
  apiKey: "dummykey"
};

const configWithBadInput = {
  ...configWithKey,
  inputFile: "BadInput.csv"
};

jest.mock("../lib/geocode_service");

function processWithoutKey() {
  processFile(config);
}

describe("index suite", function() {
  test("should throw an error if the API key is undefined", function() {
    expect(processWithoutKey).toThrow(
      "Google Geocode Service API Key Required"
    );
  });

  test("should exit with undefined if successful", function() {
    expect(processFile(configWithKey)).toBe(undefined);
  });
});

jest.clearAllMocks();
