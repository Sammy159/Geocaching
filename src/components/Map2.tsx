import "leaflet/dist/leaflet.css";
import "leaflet-gpx";
import "./map.css";
import React, { useEffect, useRef } from "react";
import L, { Map, LatLng, LatLngExpression } from "leaflet";

const LMap: React.FC = () => {
  const map = useRef<Map | null>(null);
  const gpxLayerRef = useRef<L.GPX | null>(null);

  const markerWidth: number = 30;
  const markerHeight: number = markerWidth / 0.61;

  useEffect(() => {
    addMap();
    loadGPXFile();
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
      .bindPopup("<b>Cache</b>");
  }

  function loadGPXFile() {
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

  return (
    <>
      <div id="map"></div>
    </>
  );
};

export default LMap;
