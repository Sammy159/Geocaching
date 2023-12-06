import "leaflet/dist/leaflet.css";
import "./map.css";
import React, { useEffect, useRef, useState } from "react";
import L, { LatLngExpression, Map } from "leaflet";

interface MapProps {
  //geoPoints: GeoPoint[];
  //radius: number;
  //voiceIsOn: boolean;
}

const LMap: React.FC<MapProps> = () => {
  const map = useRef<Map | null>(null);

  const markerWidth: number = 30;
  const markerHeight: number = markerWidth / 0.61;

  useEffect(() => {
    addMap();
  }, []);

  useEffect(() => {
    if (map && map.current) addMarkers();
  }, [map]);

  function addMap() {
    if (map.current) {
      return;
    }
    map.current = L.map("map").setView([49.43496, 11.86785], 17);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.current);
    console.log("addMap Function");
  }

  function addMarkers() {
    var myIcon = L.icon({
      iconUrl: "src/Icons/baseline_park_black_24dp.png",
      iconSize: [markerWidth, markerHeight],
      iconAnchor: [markerWidth / 2, markerHeight],
      //popupAnchor: [-3, -76],
    });
    if (map && map.current)
      L.marker([49.43496, 11.86785], { icon: myIcon }).addTo(map.current);
  }

  return (
    <>
      <div id="map"></div>
    </>
  );
};

export default LMap;
