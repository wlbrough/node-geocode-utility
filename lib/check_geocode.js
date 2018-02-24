const compliantGeocode = response => {
  const { results, status } = response;
  if (status !== "OK" || results.length < 1 || results.length > 1) return null;
  if (
    results[0].partial_match ||
    results[0].geometry.location_type !== "ROOFTOP"
  )
    return null;
  return results[0];
};

module.exports = compliantGeocode;
