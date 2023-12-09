import { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";

const MyGpxParser = () => {
  const [coordinates, setCoordinates] = useState<
    {
      lat: number;
      lon: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchDataAndParse = async () => {
      try {
        const content = await fetchXMLContent();
        if (content) {
          const xmlDataStr = content;
          const options = {
            ignoreAttributes: false,
          };
          const parser = new XMLParser(options);
          let jsonObj = parser.parse(xmlDataStr);

          // Do something with jsonObj, e.g.,
          const parsedCoordinates = jsonObj.gpx.trk.trkseg.trkpt.map(
            (trkpt: any) => {
              const lat = parseFloat(trkpt["@_lat"]);
              const lon = parseFloat(trkpt["@_lon"]);
              return { lat, lon };
            }
          );

          setCoordinates(parsedCoordinates);
        }
      } catch (error) {
        console.error("Fehler beim Laden und Parsen der XML-Datei:", error);
      }
    };

    fetchDataAndParse();
  }, []);

  return coordinates;
};

export default MyGpxParser;

const fetchXMLContent = async () => {
  try {
    const response = await fetch("../../gartenschau.gpx");
    const xmlText = await response.text();

    //const parser = new DOMParser();
    //const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    return xmlText;
  } catch (error) {
    console.error("Fehler beim Laden der XML-Datei:", error);
    return null;
  }
};
