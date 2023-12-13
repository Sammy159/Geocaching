import L from "leaflet";

interface MarkerInfo {
  name: string;
  latLng: L.LatLng;
  marker: L.Marker;
  found: boolean;
}

export default class CacheManager {
  private markersDictionary = new Map<string, MarkerInfo>();

  addMarker(
    name: string,
    latlng: L.LatLng,
    marker: L.Marker,
    found: boolean
  ): void {
    const markerInfo: MarkerInfo = {
      name,
      latLng: latlng,
      marker,
      found,
    };

    this.markersDictionary.set(name, markerInfo);
  }

  getMarkerInfo(name: string): MarkerInfo | undefined {
    return this.markersDictionary.get(name);
  }

  updateMarkerFoundStatus(name: string, found: boolean): void {
    const markerInfo = this.markersDictionary.get(name);
    if (markerInfo) {
      markerInfo.found = found;
      this.markersDictionary.set(name, markerInfo);
    }
  }
}

//Verwendung:

/* // AndereDatei.ts
import { MarkerManager } from './MarkerManager';

const markerManager = new MarkerManager();

// Fügen Sie einen Marker hinzu
markerManager.addMarker("Marker1", 40.7128, -74.0060, false);

// Abrufen der Marker-Informationen
const markerInfo = markerManager.getMarkerInfo("Marker1");
console.log(markerInfo);

// Aktualisieren des Gefunden-Status
markerManager.updateMarkerFoundStatus("Marker1", true);
 */
