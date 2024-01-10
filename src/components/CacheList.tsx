/**
 * Interface representing an individual cache in the cache list.
 */
interface CacheList {
  name: string; // The name of the cache.
  latLng: L.LatLng; // The geographical coordinates of the cache.
  found: boolean; // A boolean indicating whether the cache has been found.
  time: Date; // The date and time of the cache entry.
}

/**
 * Interface properties for the ListMenu component.
 */
interface ListMenuProps {
  /**
   * An array of CacheList objects to be displayed in the list.
   */
  cacheList: CacheList[] | undefined;

  /**
   * A function called to open or close the state of the list.
   * @param open - A boolean value indicating whether to open or close the list.
   */
  setOpenList: (open: boolean) => void;
}

/**
 * A React component for displaying a popup list of caches.
 * @param {ListMenuProps} props - The properties for the CacheListPopup component.
 */
const CacheListPopup: React.FC<ListMenuProps> = ({
  cacheList,
  setOpenList,
}) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Tag der Woche (voller Name)
    year: "numeric", // Jahr (z. B. 2024)
    month: "long", // Monat (voller Name)
    day: "numeric", // Tag des Monats (z. B. 08)
    hour: "2-digit", // Stunde (zweistellige Darstellung)
    minute: "2-digit", // Minute (zweistellige Darstellung)
    second: "2-digit", // Sekunde (zweistellige Darstellung)
    timeZoneName: "short", // Zeitzone (kurze Darstellung)
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "-700%",
          zIndex: 100,
          backgroundColor: "black",
        }}
      >
        <a className="close" onClick={() => setOpenList(false)}>
          &times;
        </a>
        <ul>
          {cacheList?.map((cache, index) => (
            <li key={index}>
              <p>
                Name: {cache.name}, Latitude: {cache.latLng.lat.toFixed(4)},
                Longitude:
                {cache.latLng.lng.toFixed(4)}, Gefunden:
                {cache.found ? "Ja" : "Nein"}, Zeit:
                {cache.time.toLocaleString("de-DE", options)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default CacheListPopup;
