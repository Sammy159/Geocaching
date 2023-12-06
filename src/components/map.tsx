import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngLiteral } from "leaflet";

//import GeocacheIcon from "./icons";

interface LeafletMapProps {
  center: LatLngLiteral;
  zoom: number;
  style: { height: string; width: string };
}

const LeafletMap: React.FC<LeafletMapProps> = ({ center, zoom, style }) => {
  const treeIcon = new L.Icon({
    iconUrl: "public/Icons/baseline_park_black_24dp.png",
    iconSize: [32, 32], // Setze die Größe des Icons
    iconAnchor: [16, 32], // Setze den Ankerpunkt des Icons
    popupAnchor: [0, -32], // Setze den Ankerpunkt für das Popup
  });

  return (
    <MapContainer center={center} zoom={zoom} style={style}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} icon={treeIcon}>
        <Popup>I am a marker!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
