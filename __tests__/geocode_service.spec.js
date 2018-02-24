const geocodeService = require("../lib/geocode_service");

jest.mock("../lib/https_request", () => {
  return jest.fn(() => ({
    status: "OK",
    results: [{ geometry: { location_type: "ROOFTOP" } }]
  }));
});

describe("index suite", function() {
  test("should receive a resolved promise containing results", async () => {
    expect.assertions(1);
    const data = await geocodeService(
      '"1600 Pennsylvania Ave NW, Washington, DC 20500"'
    );
    expect(data).toMatchObject({ geometry: { location_type: "ROOFTOP" } });
  });
});

jest.clearAllMocks();
