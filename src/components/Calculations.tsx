//Credit: Chris Veness, 2022, https://www.movable-type.co.uk/scripts/latlong.html

/**
 * Calculates the distance between two geographical coordinates using the Haversine formula.
 *
 * @param {number} lat1 - The latitude of the first coordinate in decimal degrees.
 * @param {number} lon1 - The longitude of the first coordinate in decimal degrees.
 * @param {number} lat2 - The latitude of the second coordinate in decimal degrees.
 * @param {number} lon2 - The longitude of the second coordinate in decimal degrees.
 *
 * @returns {number} - The distance between the two coordinates in meters.
 */
export function CalcDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Radius of the Earth in meters
  const φ1 = (lat1 * Math.PI) / 180; // Convert latitudes to radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180; // Difference in latitudes
  const Δλ = ((lon2 - lon1) * Math.PI) / 180; // Difference in longitudes

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // Distance in meters

  return d;
}
