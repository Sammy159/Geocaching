import React, { useEffect, useState } from "react";

interface Waypoint {
  position: [number, number];
  name: string;
  icon: string;
}

export const WaypointsComponent: React.FC = () => {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

  useEffect(() => {
    const xmlData = XMLReader();

    const parseWaypoints = (xmlData: any): Waypoint[] => {
      const parsedWaypoints: Waypoint[] = [];

      if (xmlData.gpx && xmlData.gpx.wpt && xmlData.gpx.wpt.length > 0) {
        xmlData.gpx.wpt.forEach((waypoint: any) => {
          const latitude = waypoint["$"].lat;
          const longitude = waypoint["$"].lon;
          parsedWaypoints.push({
            position: [parseFloat(latitude), parseFloat(longitude)],
            name: waypoint.name[0],
            icon: waypoint.icon,
          });
        });
      }

      return parsedWaypoints;
    };

    // Parse-Funktion aufrufen und Zustand aktualisieren
    setWaypoints(parseWaypoints(xmlData));
  }, []);

  return (
    <div>
      <h1>Waypoints</h1>
      <ul>
        {waypoints.map((waypoint, index) => (
          <li key={index}>
            <strong>Name:</strong> {waypoint.name}, <strong>Position:</strong>{" "}
            {waypoint.position.join(", ")}, <strong>Icon:</strong>{" "}
            {waypoint.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaypointsComponent;

const XMLReader = () => {
  const [xmlContent, setXmlContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchXML = async () => {
      try {
        const response = await fetch("../../public/gpx.xml");
        const xmlText = await response.text();
        console.log(response);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        setXmlContent(xmlText);
      } catch (error) {
        console.error("Fehler beim Laden der XML-Datei:", error);
      }
    };

    fetchXML();
  }, []); // Leere Abhängigkeitsliste stellt sicher, dass der Effekt nur einmal ausgeführt wird

  return xmlContent;
};
