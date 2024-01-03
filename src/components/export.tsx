import { useCacheManager } from "../context/CacheManagerContext";

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
  console.log("export function");
  console.log(result);
  return result;
};

const DownloadGPXFileLink = () => {
  const xml = createXmlString();
  const url = "data:text/json;charset=utf-8," + encodeURIComponent(xml);
  const myFilename = `GespeicherteCaches.gpx`;

  return (
    <a download={myFilename} href={url}>
      GPX-Datei herunterladen
    </a>
  );
};

export default DownloadGPXFileLink;
