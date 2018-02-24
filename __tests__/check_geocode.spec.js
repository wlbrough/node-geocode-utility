const compliantGeocode = require("../lib/check_geocode");

describe("check_geocode test suite", function() {
  test("should return null if status is ZERO_RESULTS", function() {
    expect(compliantGeocode({ status: "ZERO_RESULTS" })).toBeNull();
  });

  test("should return null if less than 1 result", function() {
    expect(compliantGeocode({ results: [] })).toBeNull();
  });

  test("should return null if more than 1 result returned", function() {
    expect(compliantGeocode({ results: [{ a: 1 }, { b: 2 }] })).toBeNull();
  });

  test("should return null if result is partial", function() {
    expect(
      compliantGeocode({ status: "OK", results: [{ partial_match: true }] })
    ).toBeNull();
  });

  test("should return null if not 'ROOFTOP' result", function() {
    expect(
      compliantGeocode({
        status: "OK",
        results: [{ geometry: { location_type: "APPROXIMATE" } }]
      })
    ).toBeNull();
  });

  test("should return JSON result for valid geocode", function() {
    expect(
      compliantGeocode({
        status: "OK",
        results: [{ geometry: { location_type: "ROOFTOP" } }]
      })
    ).toMatchObject({ geometry: { location_type: "ROOFTOP" } });
  });
});
