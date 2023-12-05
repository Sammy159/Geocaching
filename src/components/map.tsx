import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngLiteral } from "leaflet";

import GeocacheIcon from "./icons";

interface OpenStreetMapProps {
  center: LatLngLiteral;
  zoom: number;
  style: { height: string; width: string };
}

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
  center,
  zoom,
  style,
}) => {
  return (
    <MapContainer center={center} zoom={zoom} style={style}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>I am a marker!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default OpenStreetMap;

var treeIcon = new GeocacheIcon({
  iconUrl: "../Icons/baseline_park_black_24dp.png",
});

L.marker([49.43496, 11.86785], { icon: treeIcon }).addTo(OpenStreetMap);
