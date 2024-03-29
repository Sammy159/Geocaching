import { useState, useRef, useEffect } from "react";
import doneIcon from "/Icons/baseline_done_black_24dp.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./button.css";
import CacheListPopup from "./CacheList";
import DownloadGPXFileLink from "./ExportToFile";
import GPSPermissionQuery from "./GPSPermission";

interface CacheList {
  name: string;
  latLng: L.LatLng;
  found: boolean;
  time: Date;
}

interface SettingsMenuProps {
  cacheList: CacheList[] | undefined;
  setRadiusSetting: (numbr: number) => void;
  setDoSprachausgabe: (bool: boolean) => void;
  doSprachausgabe: boolean;
  setDebugModusOn: (bool: boolean) => void;
  setLocation: (coords: GeolocationCoordinates | null) => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  cacheList,
  setRadiusSetting,
  setDoSprachausgabe,
  doSprachausgabe,
  setDebugModusOn,
  setLocation,
}) => {
  const divStyle = {
    color: "black",
  };
  const [open, setOpen] = useState<boolean>(false);
  const [openList, setOpenList] = useState<boolean>(false);
  const [openRadiusInput, setOpenRadiusInput] = useState<boolean>(false);
  const [sprachausgabe, setSprachausgabe] = useState(doSprachausgabe);
  const [debugModus, setDebugModus] = useState<boolean>(true);
  const radiusInputRef = useRef<HTMLInputElement>(null);
  const closeModal = () => setOpen(false);

  function showCacheList() {
    console.log(cacheList);
    closeModal();
    setOpenList(true);
  }

  useEffect(() => {
    setDoSprachausgabe(sprachausgabe);
  }, [sprachausgabe]);

  return (
    <>
      <button
        type="button"
        className="iconButton"
        id="settings"
        onClick={() => setOpen((o) => !o)}
      ></button>
      <Popup
        open={open}
        position={"bottom center"}
        closeOnDocumentClick
        onClose={closeModal}
        nested
      >
        <div style={divStyle}>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <div onClick={showCacheList}> Liste der Geocaches anzeigen </div>

          <label
            htmlFor="radius"
            onClick={() => setOpenRadiusInput(!openRadiusInput)}
          >
            Radius ändern
          </label>
          <br></br>
          {openRadiusInput ? (
            <>
              <input
                type="number"
                id="radius"
                name="radius"
                ref={radiusInputRef}
              ></input>
              <button
                type="button"
                className="iconButton"
                onClick={() => {
                  setRadiusSetting(Number(radiusInputRef.current?.value));
                  console.log(Number(radiusInputRef.current?.value));
                }}
              >
                <img src={doneIcon} alt="Done" />
              </button>
            </>
          ) : null}

          <label htmlFor="sprachausgabe">
            Sprachausgabe
            <input
              type="checkbox"
              id="sprachausgabe"
              name="sprachausgabe"
              checked={sprachausgabe}
              onChange={(e) => {
                setSprachausgabe(e.target.checked);
              }}
            ></input>
          </label>
          <br></br>
          <DownloadGPXFileLink></DownloadGPXFileLink>
          <br></br>
          <label htmlFor="debugModus">
            Debugmodus
            <input
              type="checkbox"
              id="debugModus"
              name="debugModus"
              checked={debugModus}
              onChange={(e) => {
                setDebugModusOn(e.target.checked);
                setDebugModus(e.target.checked);
              }}
            ></input>
            {!debugModus ? (
              <GPSPermissionQuery
                setLocation={setLocation}
              ></GPSPermissionQuery>
            ) : null}
          </label>
          <br></br>
        </div>
      </Popup>

      {openList ? (
        <CacheListPopup
          cacheList={cacheList}
          setOpenList={setOpenList}
        ></CacheListPopup>
      ) : null}
    </>
  );
};

export default SettingsMenu;
