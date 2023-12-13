import "leaflet/dist/leaflet.css";
import "leaflet-gpx";
import "./map.css";
import MyGpxParser from "./gpxParser";
import Dropdown from "./Dropdown";
//import { CalcDistance } from "./Calculations";
import React, { useEffect, useRef } from "react";
import L, { Map } from "leaflet";

let markerRef: L.Marker | null = null;

const LMap: React.FC = () => {
  const style = {
    display: "flex",
  };

  const map = useRef<Map | null>(null);
  const gpxLayerRef = useRef<L.GPX | null>(null);

  const markerWidth: number = 25;
  const markerHeight: number = markerWidth / 0.7;

  const iconDict: { [key: string]: string } = {
    Cafe: "./Icons/baseline_local_cafe_black_24dp.png",
    Blume: "./Icons/baseline_local_florist_black_24dp.png",
    Baum: "./Icons/baseline_park_black_24dp.png",
    Wasser: "./Icons/baseline_water_black_24dp.png",
    Wolke: "./Icons/outline_cloud_black_24dp.png",
    Sitzplatz: "./Icons/outline_deck_black_24dp.png",
    Trophäe: "./Icons/outline_emoji_event_black_24dp.png",
    Grill: "./Icons/outline_outdoor_grill_black_24dp.png",
    Ball: "./Icons/outline_sports_soccer_black_24dp.png",
    Fragezeichen: "question_mark.png",
  };

  let index = useRef<number>(0);
  let firstMarker = useRef<boolean>(true);
  //let markerRef = useRef<L.Marker | null>(null);
  const trackCoordinatesRef = useRef<
    {
      lat: number;
      lon: number;
    }[]
  >([]);
  const intervalDelay = 2000;
  let intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  trackCoordinatesRef.current = MyGpxParser();

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

  function addMarkers(latlng: L.LatLng, iconName: string) {
    const myIcon = L.icon({
      iconUrl: iconDict[iconName],
      iconSize: [markerWidth, markerHeight],
      iconAnchor: [markerWidth / 2, markerHeight],
      popupAnchor: [-5, -48],
    });

    L.marker(latlng, { icon: myIcon })
      .addTo(map.current!)
      .bindPopup("<b>" + iconName + "</b>");
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
          if (firstMarker.current) {
            markerRef = L.marker(
              [
                trackCoordinatesRef.current[index.current].lat,
                trackCoordinatesRef.current[index.current].lon,
              ],
              { icon: figureIcon }
            )
              .addTo(map.current!)
              .bindPopup("<b>Aktuelle Position</b>");
            firstMarker.current = false;
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
    //calc LatLon for Cache
    //jetztige Position bestimmen
    let currentPosition = getCurrentPosition() || null;
    const iconName = selectedOption.split(" ");
    //add Marker to Map
    if (currentPosition) {
      currentPosition["lat"] += 0.00002;
      currentPosition["lng"] += 0.00002;
      addMarkers(currentPosition, iconName[1]);
    }
    //save LatLon with Cache Name in local Storage
  };

  /*function saveCoordsToLocalStorage(cacheName: string, coords: string) {
    localStorage.setItem(cacheName, coords);
  }*/

  //Dropdown Menü Optionen
  const options = [
    "Cache Cafe",
    "Cache Blume",
    "Cache Baum",
    "Cache Wasser",
    "Cache Wolke",
    "Cache Sitzplatz",
    "Cache Trophäe",
    "Cache Grill",
    "Cache Ball",
    "Cache Fragezeichen",
  ];

  return (
    <div style={style}>
      <div id="map"></div>
      <MyButton text={"Losgehen"} onClick={startWalk} />
      <MyButton text={"Pause"} onClick={pauseInterval} />
      <Dropdown options={options} onSelect={handleCacheSelect} />
    </div>
  );
};

export default LMap;

function MyButton({ text, onClick }: { text: string; onClick: () => void }) {
  const style = {
    width: "120px",
    height: "50px",
    backgroundColor: "grey",
    margin: "5px",
  };
  return (
    <button style={style} onClick={onClick}>
      {text}
    </button>
  );
}

export function getCurrentPosition() {
  return markerRef?.getLatLng();
}
