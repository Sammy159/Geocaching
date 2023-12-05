import L from "leaflet";

var GeocacheIcon = L.Icon.extend({
  options: {
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  },
});

export default GeocacheIcon;
