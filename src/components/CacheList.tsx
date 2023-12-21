interface CacheList {
  name: string;
  latLng: L.LatLng;
  found: boolean;
  time: Date;
}
interface ListMenuProps {
  cacheList: CacheList[] | undefined;
  setOpenList: (open: boolean) => void;
}

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
