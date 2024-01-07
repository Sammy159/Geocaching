import L from "leaflet";
import "./App.css";
import "./components/button.css";
import MyButton from "./components/Button";
import LMap from "./components/Map2";
import { useEffect, useState } from "react";
import QrReader from "./components/QRCodeReader";
import qrIcon from "/Icons/outline_qr_code_scanner_black_24dp.png";
import SettingsMenu from "./components/Settings";
import { useCacheManager } from "./context/CacheManagerContext";

function App() {
  interface CacheList {
    name: string;
    latLng: L.LatLng;
    found: boolean;
    time: Date;
  }

  const cacheManager = useCacheManager();
  const [isHiding, setIsHiding] = useState(false);
  const [showNextScreen, setNextScreen] = useState(false);
  const [showQRReader, setShowQRReader] = useState(false);
  const [qrResult, setQRresult] = useState<string>("");
  const [cacheList, setCacheList] = useState<CacheList[]>([]);
  const [radiusSetting, setRadiusSetting] = useState<number>(50);
  const [doSprachausgabe, setDoSprachausgabe] = useState(true);

  function showHidingScreen() {
    setIsHiding(true);
    setNextScreen(true);
  }
  function showSeekingScreen() {
    setIsHiding(false);
    setNextScreen(true);
    setQRresult("");
  }
  function backToHome() {
    setIsHiding(false);
    setNextScreen(false);
  }
  function handleQRresult(result: any) {
    setQRresult(result);
    setShowQRReader(false);
  }
  function handleQRerror(error: any) {
    console.log(error?.message);
    setShowQRReader(false);
  }
  function toggleQRReader() {
    setShowQRReader(!showQRReader); // Umschalten der Anzeige des QR-Lesers
  }
  useEffect(() => {
    const gespeicherteDaten = localStorage.getItem("Geocaches");
    if (
      gespeicherteDaten !== "undefined" &&
      typeof gespeicherteDaten !== "undefined"
    ) {
      if (gespeicherteDaten) {
        const cacheList: CacheList[] = [];
        const cacheListTemp = JSON.parse(gespeicherteDaten);

        cacheListTemp.forEach((element: any) => {
          const cacheItem: CacheList = {
            name: element.name,
            latLng: element.latLng,
            found: element.found,
            time: element.time,
          };
          cacheList.push(cacheItem);

          //Wieder in den CacheManager speichern
          const latLng = L.latLng(element.latLng.lat, element.latLng.lng);
          const marker = L.marker(latLng);
          cacheManager?.addMarker(
            element.name,
            latLng,
            marker,
            element.found,
            element.time ? new Date(element.time) : new Date()
          );
        });
        setCacheList(cacheList);
      }
    }
  }, []);

  return (
    <>
      <h1>Geocaching Amberg LGS</h1>
      {!showNextScreen ? (
        <img
          src="public/compass.png"
          alt="compass"
          className="compassDiv"
        ></img>
      ) : null}

      {showNextScreen &&
        showQRReader && ( // QR-Leser nur anzeigen, wenn showNextScreen und showQRReader true sind
          <QrReader
            handleDecode={handleQRresult}
            handleError={handleQRerror}
          ></QrReader>
        )}
      {showNextScreen ? (
        <LMap
          isHiding={isHiding}
          qrResult={qrResult}
          radiusSetting={radiusSetting}
          doSprachausgabe={doSprachausgabe}
        ></LMap>
      ) : null}
      <div className="bottom-div">
        <div className="gradient-div">
          {!showNextScreen ? (
            <MyButton text={"Verstecken"} onClick={showHidingScreen}></MyButton>
          ) : (
            <>
              <MyButton text={"Zurück"} onClick={backToHome}></MyButton>
              <button onClick={toggleQRReader} className="iconButton" id="qr">
                {/*<img src={qrIcon} alt="QR Leser" style={{ height: "100%" }} />*/}
              </button>
            </>
          )}
          <SettingsMenu
            cacheList={cacheList}
            setRadiusSetting={setRadiusSetting}
            setDoSprachausgabe={setDoSprachausgabe}
            doSprachausgabe={doSprachausgabe}
          ></SettingsMenu>
          {!showNextScreen ? (
            <MyButton text={"Suchen"} onClick={showSeekingScreen}></MyButton>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
