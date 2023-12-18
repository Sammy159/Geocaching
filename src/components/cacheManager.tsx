import L from "leaflet";

interface MarkerInfo {
  name: string;
  latLng: L.LatLng;
  marker: L.Marker;
  found: boolean;
  time?: Date;
}

export default class CacheManager {
  private markersDictionary = new Map<string, MarkerInfo>();

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

  getNumberOfHidden(): number {
    let count = 0;
    this.markersDictionary.forEach((markerInfo) => {
      if (!markerInfo.found) {
        count++;
      }
    });
    return count;
  }

  getNames(): string[] {
    let names: string[] = [];
    this.markersDictionary.forEach((markerInfo) => {
      names.push(markerInfo.name);
    });
    return names;
  }

  updateMarkerTime(name: string, newTime: Date): void {
    const markerInfo = this.markersDictionary.get(name);
    if (markerInfo) {
      markerInfo.time = newTime;
      this.markersDictionary.set(name, markerInfo);
    }
  }

  isMarkerPresent(name: string): boolean {
    return this.markersDictionary.has(name);
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
