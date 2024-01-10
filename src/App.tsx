import L from "leaflet";
import "./App.css";
import "./components/button.css";
import MyButton from "./components/Button";
import LMap from "./components/Map";
import { useEffect, useState } from "react";
import QrReader from "./components/QRCodeReader";
import SettingsMenu from "./components/Settings";
import { useCacheManager } from "./context/CacheManagerContext";
import compassIcon from "/compass.png";
import GPSPermissionQuery from "./components/GPSPermission";

function App() {
  // Schnittstelle für die Cache-Liste definieren
  interface CacheList {
    name: string;
    latLng: L.LatLng;
    found: boolean;
    time: Date;
  }

  // Cache-Manager aus dem Kontext holen
  const cacheManager = useCacheManager();

  // Zustandsvariablen definieren
  const [isHiding, setIsHiding] = useState<boolean>(false);
  const [showNextScreen, setNextScreen] = useState<boolean>(false);
  const [showQRReader, setShowQRReader] = useState<boolean>(false);
  const [qrResult, setQRResult] = useState<string>("");
  const [cacheList, setCacheList] = useState<CacheList[]>([]);
  const [radiusSetting, setRadiusSetting] = useState<number>(50);
  const [doSprachausgabe, setDoSprachausgabe] = useState<boolean>(true);

  // Funktionen zur Steuerung des Bildschirms definieren
  function showHidingScreen() {
    setIsHiding(true);
    setNextScreen(true);
  }

  function showSeekingScreen() {
    setIsHiding(false);
    setNextScreen(true);
    setQRResult("");
  }

  function backToHome() {
    setIsHiding(false);
    setNextScreen(false);
  }

  function handleQRResult(result: string) {
    setQRResult(result);
    setShowQRReader(false);
  }

  function handleQRError(error: any) {
    console.log(error?.message);
    setShowQRReader(false);
  }

  function toggleQRReader() {
    setShowQRReader(!showQRReader);
  }

  useEffect(() => {
    // Gespeicherte Cache-Daten aus dem lokalen Speicher abrufen
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

          // Marker für den Cache in den CacheManager hinzufügen
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
      <GPSPermissionQuery></GPSPermissionQuery>
      <div className="top-div">
        <h1
          style={{
            color: "black",
            fontWeight: "bold",
          }}
        >
          Geocaching Amberg LGS
        </h1>
      </div>
      {!showNextScreen ? (
        <img src={compassIcon} alt="compass" className="compassDiv"></img>
      ) : null}

      {showNextScreen && showQRReader && (
        <QrReader
          handleDecode={handleQRResult}
          handleError={handleQRError}
        ></QrReader>
      )}
      {showNextScreen ? (
        <LMap
          isHiding={isHiding}
          qrResult={qrResult}
          radiusSetting={radiusSetting}
          doSprachausgabe={doSprachausgabe}
          setCacheList={setCacheList}
        ></LMap>
      ) : null}
      <div className="bottom-div">
        <div className="flexbox-bottom">
          {!showNextScreen ? (
            <MyButton text={"Verstecken"} onClick={showHidingScreen}></MyButton>
          ) : (
            <>
              <MyButton text={"Zurück"} onClick={backToHome}></MyButton>
              <button
                onClick={toggleQRReader}
                className="iconButton"
                id="qr"
              ></button>
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
