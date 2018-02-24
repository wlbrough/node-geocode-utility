const processFile = require("../lib/geocode_service");

jest.mock("../lib/https_request", () => {
  return jest.fn(() => ({ geometry: { location_type: "ROOFTOP" } }));
});

describe("index suite", function() {
  test("should do something", function() {
    expect(true).toBe(true);
  });
});

jest.clearAllMocks();
