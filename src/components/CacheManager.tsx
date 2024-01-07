import L from "leaflet";

/**
 * Interface representing information about a marker.
 */
interface MarkerInfo {
  name: string; // The name of the marker.
  latLng: L.LatLng; // The geographical coordinates of the marker.
  marker: L.Marker; // The Leaflet marker itself.
  found: boolean; // A boolean indicating whether the cache was found.
  time?: Date; // The date and time of the cache entry (optional).
}

/**
 * A class for managing markers and their associated information.
 */
export default class CacheManager {
  private markersDictionary = new Map<string, MarkerInfo>();

  /**
   * Adds a new marker and its associated information.
   * @param name - The name of the marker.
   * @param latlng - The geographical coordinates of the marker.
   * @param marker - The Leaflet marker.
   * @param found - A boolean indicating whether the cache was found.
   * @param time - The date and time of the cache entry (optional).
   */
  addMarker(
    name: string,
    latlng: L.LatLng,
    marker: L.Marker,
    found: boolean,
    time: Date = new Date()
  ): void {
    const markerInfo: MarkerInfo = {
      name,
      latLng: latlng,
      marker,
      found,
      time,
    };

    this.markersDictionary.set(name, markerInfo);
  }

  /**
   * Retrieves information about a specific marker.
   * @param name - The name of the marker.
   * @returns The marker information or undefined if the marker is not found.
   */
  getMarkerInfo(name: string): MarkerInfo | undefined {
    return this.markersDictionary.get(name);
  }

  /**
   * Updates the "found" status of a marker.
   * @param name - The name of the marker.
   * @param found - A boolean indicating whether the cache was found.
   */
  updateMarkerFoundStatus(name: string, found: boolean): void {
    const markerInfo = this.markersDictionary.get(name);
    if (markerInfo) {
      markerInfo.found = found;
      this.markersDictionary.set(name, markerInfo);
    }
  }

  /**
   * Gets the number of hidden markers (not found).
   * @returns The count of hidden markers.
   */
  getNumberOfHidden(): number {
    let count = 0;
    this.markersDictionary.forEach((markerInfo) => {
      if (!markerInfo.found) {
        count++;
      }
    });
    return count;
  }

  /**
   * Gets an array of marker names.
   * @returns An array of marker names.
   */
  getNames(): string[] {
    let names: string[] = [];
    this.markersDictionary.forEach((markerInfo) => {
      names.push(markerInfo.name);
    });
    return names;
  }

  /**
   * Updates the time associated with a marker.
   * @param name - The name of the marker.
   * @param newTime - The new date and time.
   */
  updateMarkerTime(name: string, newTime: Date): void {
    const markerInfo = this.markersDictionary.get(name);
    if (markerInfo) {
      markerInfo.time = newTime;
      this.markersDictionary.set(name, markerInfo);
    }
  }

  /**
   * Checks if a marker is present in the cache manager.
   * @param name - The name of the marker.
   * @returns A boolean indicating whether the marker is present.
   */
  isMarkerPresent(name: string): boolean {
    return this.markersDictionary.has(name);
  }

  /**
   * Converts the stored marker information to JSON format.
   * @returns A JSON string containing the marker information.
   */
  convertToJSON(): string {
    const markerInfoArray = Array.from(this.markersDictionary.values()).map(
      ({ marker, ...rest }) => rest
    );
    return JSON.stringify(markerInfoArray);
  }
}
