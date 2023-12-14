import "leaflet/dist/leaflet.css";
import "leaflet-gpx";
import "./map.css";
import MyGpxParser from "./GpxParser";
import Dropdown from "./Dropdown";
import MyButton from "./Button";
import CacheManager from "./cacheManager";
//import { CalcDistance } from "./Calculations";
import React, { useEffect, useRef } from "react";
import L, { Map } from "leaflet";

let markerRef: L.Marker | null = null;

interface MapProps {
  isHiding: boolean;
}

const LMap: React.FC<MapProps> = ({ isHiding }) => {
  console.log(isHiding);
  const map = useRef<Map | null>(null);
  const gpxLayerRef = useRef<L.GPX | null>(null);

  const markerWidth: number = 25;
  const markerHeight: number = markerWidth / 0.7;

  const cacheManager = new CacheManager();

  const iconDict: { [key: string]: string } = {
    Cafe: "./Icons/baseline_local_cafe_black_24dp.png",
    Blume: "./Icons/baseline_local_florist_black_24dp.png",
    Baum: "./Icons/baseline_park_black_24dp.png",
    Wasser: "./Icons/baseline_water_black_24dp.png",
    Wolke: "./Icons/outline_cloud_black_24dp.png",
    Sitzplatz: "./Icons/outline_deck_black_24dp.png",
    Trophäe: "./Icons/outline_emoji_events_black_24dp.png",
    Grill: "./Icons/outline_outdoor_grill_black_24dp.png",
    Ball: "./Icons/outline_sports_soccer_black_24dp.png",
    Fragezeichen: "question_mark.png",
  };

  let index = useRef<number>(0);
  let isFirstMarker = useRef<boolean>(true);

  const trackCoordinatesRef = useRef<
    {
      lat: number;
      lon: number;
    }[]
  >([]);
  trackCoordinatesRef.current = MyGpxParser();
  const intervalDelay = 2000;
  let intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const figureIcon = L.icon({
    iconUrl: "./Icons/baseline_directions_walk_black_24dp.png",
    iconSize: [markerWidth, markerHeight],
    iconAnchor: [markerWidth / 2, markerHeight],
    popupAnchor: [-5, -48],
  });

  useEffect(() => {
    addMap();
    loadGPXTrack();
  }, []);

  function addMap() {
    if (map.current) {
      return;
    }
    map.current = L.map("map").setView([49.44192, 11.85872], 17);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.current);
  }

  function addCacheMarkers(latlng: L.LatLng, iconName: string) {
    const myIcon = L.icon({
      iconUrl: iconDict[iconName],
      iconSize: [markerWidth, markerHeight],
      iconAnchor: [markerWidth / 2, markerHeight],
      popupAnchor: [-5, -48],
    });

    const marker = L.marker(latlng, { icon: myIcon })
      .addTo(map.current!)
      .bindPopup("<b>" + iconName + "</b>");
    //TODO: Brache ich die Referenz auf den Marker direkt?
    //-> Merken: setOpacity für suchen Phase!
    cacheManager.addMarker(iconName, latlng, marker, false);
  }

  function loadGPXTrack() {
    if (map.current) {
      const gpxFile = "/gartenschau.gpx";

      new L.GPX(gpxFile, {
        async: true,
        gpx_options: { parseElements: ["track", "route", "waypoint"] },
        marker_options: {
          startIconUrl: "leaflet-gpx-icons/pin-icon-start.png",
          endIconUrl: "leaflet-gpx-icons/pin-icon-end.png",
          shadowUrl: "leaflet-gpx-icons/pin-shadow.png",
        },
      })
        .on("loaded", function (e: any) {
          gpxLayerRef.current = e.target;
        })
        .addTo(map.current);
    }
  }

  function startWalk() {
    if (intervalIdRef.current === null) {
      intervalIdRef.current = setInterval(() => {
        if (index.current < trackCoordinatesRef.current.length) {
          // Karte auf den aktuellen Standort zentrieren
          map.current?.setView(
            L.latLng([
              trackCoordinatesRef.current[index.current].lat,
              trackCoordinatesRef.current[index.current].lon,
            ]),
            20
          );
          // Marker an den aktuellen Standort setzen
          if (isFirstMarker.current) {
            markerRef = L.marker(
              [
                trackCoordinatesRef.current[index.current].lat,
                trackCoordinatesRef.current[index.current].lon,
              ],
              { icon: figureIcon }
            )
              .addTo(map.current!)
              .bindPopup("<b>Aktuelle Position</b>");
            isFirstMarker.current = false;
          } else {
            if (markerRef !== null) {
              markerRef.setLatLng([
                trackCoordinatesRef.current[index.current].lat,
                trackCoordinatesRef.current[index.current].lon,
              ]);
            }
          }
          index.current++;
        } else {
          if (intervalIdRef.current !== null) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null; // Set to null to indicate that the interval is cleared
          }
          if (index.current == trackCoordinatesRef.current.length) {
            index.current = 0;
          }
        }
      }, intervalDelay);
    }
  }

  function pauseInterval() {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }

  function getCurrentPosition() {
    return markerRef?.getLatLng();
  }

  const handleCacheSelect = (selectedOption: any) => {
    console.log("Selected option:", selectedOption);
    //get current position
    let currentPosition = getCurrentPosition() || null;
    const iconName = selectedOption.split(" ");
    //add Marker to Map
    if (currentPosition) {
      //calc LatLon for Cache
      currentPosition["lat"] += 0.00002;
      currentPosition["lng"] += 0.00002;
      addCacheMarkers(currentPosition, iconName[1]);
    }
    //TODO: save LatLon with Cache Name in local Storage
  };

  /*function saveCoordsToLocalStorage(cacheName: string, coords: string) {
    localStorage.setItem(cacheName, coords);
  }*/

  return (
    <>
      <div id="map"></div>
      <MyButton text={"Losgehen"} onClick={startWalk} />
      <MyButton text={"Pause"} onClick={pauseInterval} />
      <Dropdown onSelect={handleCacheSelect} />
    </>
  );
};

export default LMap;

export function getCurrentPosition() {
  return markerRef?.getLatLng();
}
