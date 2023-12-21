const createXmlString = (points: number[][]): string => {
  let result =
    '<gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" creator="runtracker"><metadata/><trk><name></name><desc></desc>';

  let segmentTag = "<trkseg>";
  segmentTag += points
    .map((point) => `<trkpt lat="${point[1]}" lon="${point[0]}"></trkpt>`)
    .join("");
  segmentTag += "</trkseg>";

  result += segmentTag;
  result += "</trk></gpx>";

  return result;
};

const downloadGpxFile = (points: number[][], numberCaches: number) => {
  const units = "gespeicherte Caches";
  const xml = createXmlString(points);
  const url = "data:text/json;charset=utf-8," + xml;
  const link = document.createElement("a");
  link.download = `${numberCaches}-${units}.gpx`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
};

export default downloadGpxFile;
