import { useCacheManager } from "../context/CacheManagerContext";

/**
 * Creates an XML string in GPX format based on cache information.
 * @returns {string} - The XML string in GPX format.
 */
const createXmlString = (): string => {
  const cacheManager = useCacheManager();
  let result =
    '<?xml version="1.0" encoding="UTF-8" standalone="no" ?><gpx version="1.1" creator="Rubenbauer Franziska">';

  let wptTag = "";
  const names = cacheManager?.getNames();
  if (names) {
    names.forEach(function (name) {
      const cache = cacheManager?.getMarkerInfo(name);
      const latLng = cache?.latLng;
      wptTag = `<wpt lat="${latLng?.lat}" lon="${latLng?.lng}"> <name> ${cache?.name} </name>`;
      if (cache?.found) {
        wptTag += `<desc>gefunden</desc>`;
        wptTag += `<time> ${cache?.time} </time>`;
      } else {
        wptTag += `<desc>nicht gefunden</desc>`;
      }
      wptTag += `</wpt>`;
    });
  }

  result += wptTag;
  result += "</gpx>";
  return result;
};

/**
 * A React component that generates a GPX file download link based on cache information.
 */
const DownloadGPXFileLink = () => {
  const xml = createXmlString();
  const url = "data:text/json;charset=utf-8," + encodeURIComponent(xml);
  const myFilename = `SavedCaches.gpx`;

  return (
    <a download={myFilename} href={url}>
      Download GPX File
    </a>
  );
};

export default DownloadGPXFileLink;
