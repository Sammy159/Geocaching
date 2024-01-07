import { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";

/**
 * A React component that fetches and parses GPX XML data into an array of coordinates.
 * @returns {Array<{ lat: number, lon: number }>} - An array of latitude and longitude coordinates.
 */
const MyGpxParser = () => {
  const [coordinates, setCoordinates] = useState<
    {
      lat: number;
      lon: number;
    }[]
  >([]);

  useEffect(() => {
    /**
     * Fetches and parses the GPX XML content.
     */
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
        console.error("Error fetching and parsing XML file:", error);
      }
    };

    fetchDataAndParse();
  }, []);

  return coordinates;
};

export default MyGpxParser;

/**
 * Fetches the GPX XML content from a file.
 * @returns {Promise<string | null>} - The XML content as a string or null if there's an error.
 */
const fetchXMLContent = async () => {
  try {
    const response = await fetch("../../gartenschau.gpx");
    const xmlText = await response.text();

    return xmlText;
  } catch (error) {
    console.error("Error fetching the XML file:", error);
    return null;
  }
};
