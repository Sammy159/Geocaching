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
}) => (
  <div
    style={{
      position: "absolute",
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
          <p>Name: {cache.name},</p>
          <p>
            Latitude: {cache.latLng.lat}, Longitude: {cache.latLng.lng},
          </p>
          <p>Found: {cache.found ? "Yes" : "No"},</p>
          <p>Time: {cache.time.toLocaleString()} </p>
        </li>
      ))}
    </ul>
  </div>
);

export default CacheListPopup;
