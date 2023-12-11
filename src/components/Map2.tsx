import "leaflet/dist/leaflet.css";
import "leaflet-gpx";
import "./map.css";
import MyGpxParser from "./GpxParser";
import React, { useEffect, useRef, useState } from "react";
import L, { Map, LatLngExpression } from "leaflet";

let markerRef: L.Marker | null = null;

const LMap: React.FC = () => {
  const map = useRef<Map | null>(null);
  const gpxLayerRef = useRef<L.GPX | null>(null);

  const markerWidth: number = 25;
  const markerHeight: number = markerWidth / 0.7;

  let index = useRef<number>(0);
  let firstMarker = useRef<boolean>(true);
  //let markerRef = useRef<L.Marker | null>(null);
  const trackCoordinatesRef = useRef<
    {
      lat: number;
      lon: number;
    }[]
  >([]);
  const intervalDelay = 200;
  let intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  trackCoordinatesRef.current = MyGpxParser();

  const figureIcon = L.icon({
    iconUrl: "./public/Icons/baseline_directions_walk_black_24dp.png",
    iconSize: [markerWidth, markerHeight],
    iconAnchor: [markerWidth / 2, markerHeight],
    popupAnchor: [-5, -48],
  });

  useEffect(() => {
    addMap();
    loadGPXTrack();
    // Daten laden und trackCoordinatesRef aktualisieren
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

  function addMarkers(latlng: LatLngExpression) {
    const myIcon = L.icon({
      iconUrl: "/Icons/baseline_park_black_24dp.png",
      iconSize: [markerWidth, markerHeight],
      iconAnchor: [markerWidth / 2, markerHeight],
      popupAnchor: [-5, -48],
    });

    L.marker(latlng, { icon: myIcon })
      .addTo(map.current!)
      .bindPopup("<b>Aktueller Standort</b>");
  }

  function loadGPXTrack() {
    if (map.current) {
      const gpxFile = "/gartenschau.gpx";

      new L.GPX(gpxFile, {
        async: true,
        gpx_options: { parseElements: ["track", "route", "waypoint"] },
        marker_options: {
          startIconUrl: "node_modules/leaflet-gpx/pin-icon-start.png",
          endIconUrl: "node_modules/leaflet-gpx/pin-icon-end.png",
          shadowUrl: "node_modules/leaflet-gpx/pin-shadow.png",
          wptIconUrls: {
            "": "node_modules/leaflet-gpx/pin-icon-wpt.png",
          },
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

  return (
    <>
      <div id="map"></div>
      <div>
        <MyButton text={"Losgehen"} onClick={startWalk} />
        <MyButton text={"Pause"} onClick={pauseInterval} />
      </div>
    </>
  );
};

export default LMap;

function MyButton({ text, onClick }: { text: string; onClick: () => void }) {
  return <button onClick={onClick}>{text}</button>;
}

export function getCurrentPosition() {
  return markerRef?.getLatLng();
}
