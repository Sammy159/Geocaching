import { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";

const MyGpxParser: React.FC = () => {
  const [xmlContent, setXmlContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAndParse = async () => {
      try {
        const content = await fetchXMLContent();
        setXmlContent(content || null);
      } catch (error) {
        console.error("Fehler beim Laden der XML-Datei in XMLReader:", error);
      }
    };

    fetchDataAndParse();
  }, []);

  const coordinates: any = [];

  useEffect(() => {
    if (xmlContent !== null) {
      const xmlDataStr = xmlContent;

      const options = {
        ignoreAttributes: false,
      };

      const parser = new XMLParser(options);
      let jsonObj = parser.parse(xmlDataStr);

      // Do something with jsonObj, e.g.,
      jsonObj.gpx.trk.trkseg.trkpt.forEach((trkpt: any) => {
        var lat = trkpt["@_lat"];
        var lon = trkpt["@_lon"];
        coordinates.push([parseFloat(lat), parseFloat(lon)]);
      });
      console.log(coordinates);
    }
  }, [xmlContent]); // Füge xmlContent zur Abhängigkeitsliste hinzu

  return <div>{/* Your React component JSX */}</div>;
};

export default MyGpxParser;

const fetchXMLContent = async () => {
  try {
    const response = await fetch("../../gartenschau.gpx");
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    return xmlText;
  } catch (error) {
    console.error("Fehler beim Laden der XML-Datei:", error);
    return null;
  }
};
