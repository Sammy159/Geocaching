import { useState, useRef, useEffect } from "react";
import settingsIcon from "/Icons/baseline_settings_black_24dp.png";
import doneIcon from "/Icons/baseline_done_black_24dp.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./button.css";
import CacheListPopup from "./CacheList";

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
  setWalkingSpeed: (numb: number) => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  cacheList,
  setRadiusSetting,
  setDoSprachausgabe,
  doSprachausgabe,
  setWalkingSpeed,
}) => {
  const divStyle = {
    color: "black",
  };
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [openRadiusInput, setOpenRadiusInput] = useState(false);
  const [sprachausgabe, setSprachausgabe] = useState(doSprachausgabe);
  const radiusInputRef = useRef<HTMLInputElement>(null);
  const speedInputRef = useRef<HTMLInputElement>(null);
  const [openSpeedInput, setOpenSpeedInput] = useState(false);
  const [speedOfWalk, setSpeedOfWalk] = useState<number>(2000);
  const closeModal = () => setOpen(false);

  function showCacheList() {
    if (cacheList) {
      console.log("Settings Cacheliste");
      console.log(cacheList);
    }
    closeModal();
    setOpenList(true);
  }

  useEffect(() => {
    setDoSprachausgabe(sprachausgabe);
  }, [sprachausgabe]);

  useEffect(() => {
    setWalkingSpeed(speedOfWalk);
  }, [speedOfWalk]);

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className="iconButton"
        onClick={() => setOpen((o) => !o)}
      >
        <img src={settingsIcon} alt="Settings" />
      </button>
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
            Radius
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
                onClick={() =>
                  setRadiusSetting(Number(radiusInputRef.current?.value))
                }
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
          <label
            htmlFor="speed"
            onClick={() => setOpenSpeedInput(!openSpeedInput)}
          >
            Gehgeschwindigkeit
          </label>
          <br></br>
          {openSpeedInput ? (
            <>
              <input
                type="number"
                id="speed"
                name="speed"
                ref={speedInputRef}
              ></input>
              <button
                type="button"
                className="iconButton"
                onClick={() =>
                  setSpeedOfWalk(Number(speedInputRef.current?.value))
                }
              >
                <img src={doneIcon} alt="Done" />
              </button>
            </>
          ) : null}
          <div> Exportieren</div>
        </div>
      </Popup>

      {openList ? (
        <CacheListPopup
          cacheList={cacheList}
          setOpenList={setOpenList}
        ></CacheListPopup>
      ) : null}
    </div>
  );
};

export default SettingsMenu;
