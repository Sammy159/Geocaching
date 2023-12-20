import { useState } from "react";
import settingsIcon from "/Icons/baseline_settings_black_24dp.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./button.css";

interface CacheList {
  name: string;
  latLng: L.LatLng;
  found: boolean;
  time: Date;
}

interface SettingsMenuProps {
  cacheList: CacheList[] | undefined;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ cacheList }) => {
  const divStyle = {
    color: "black",
  };
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  function showCacheList() {
    if (cacheList) console.log(cacheList[0].name);
    //TODO
  }

  return (
    <div>
      <button
        type="button"
        className="iconButton"
        onClick={() => setOpen((o) => !o)}
      >
        <img src={settingsIcon} alt="QR Leser" />
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal} nested>
        <div className="menu" style={divStyle}>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <Popup
            trigger={
              <div onClick={showCacheList}> Liste der Geocaches anzeigen </div>
            }
          >
            <ul>
              {cacheList?.map((cache, index) => (
                <li key={index}>
                  Name: {cache.name}, Latitude: {cache.latLng.lat}, Longitude:{" "}
                  {cache.latLng.lng}, Found: {cache.found ? "Yes" : "No"}, Time:{" "}
                  {cache.time.toLocaleString()}
                </li>
              ))}
            </ul>
          </Popup>
          <div> Radius</div>
          <div> Sprachausgabe</div>
          <div> Exportieren</div>
        </div>
      </Popup>
    </div>
  );
};

export default SettingsMenu;
