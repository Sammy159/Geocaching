import "./App.css";
import "./components/button.css";
import MyButton from "./components/Button";
import LMap from "./components/Map2";
import { useEffect, useState } from "react";
import QrReader from "./components/QRCodeReader";
import qrIcon from "/Icons/outline_qr_code_scanner_black_24dp.png";
import SettingsMenu from "./components/settings";

function App() {
  interface CacheList {
    name: string;
    latLng: L.LatLng;
    found: boolean;
    time: Date;
  }

  const [isHiding, setIsHiding] = useState(false);
  const [showNextScreen, setNextScreen] = useState(false);
  const [showQRReader, setShowQRReader] = useState(false);
  const [qrResult, setQRresult] = useState<string>("");
  const [cacheList, setCacheList] = useState<CacheList[]>();
  const [radiusSetting, setRadiusSetting] = useState<number>(50);
  const [doSprachausgabe, setDoSprachausgabe] = useState(true);
  const [walkingSpeed, setWalkingSpeed] = useState<number>(2000);

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
    if (gespeicherteDaten) {
      console.log("gespeicherte Daten");
      console.log(cacheList);
      setCacheList(JSON.parse(gespeicherteDaten));
    }
  }, []);

  return (
    <>
      <h1>Geocaching Amberg LGS</h1>
      <SettingsMenu
        cacheList={cacheList}
        setRadiusSetting={setRadiusSetting}
        setDoSprachausgabe={setDoSprachausgabe}
        doSprachausgabe={doSprachausgabe}
        setWalkingSpeed={setWalkingSpeed}
      ></SettingsMenu>
      {!showNextScreen ? (
        <>
          <MyButton text={"Verstecken"} onClick={showHidingScreen}></MyButton>
          <MyButton text={"Suchen"} onClick={showSeekingScreen}></MyButton>
        </>
      ) : (
        <>
          <MyButton text={"Zurück"} onClick={backToHome}></MyButton>
          <button onClick={toggleQRReader} className="iconButton">
            <img src={qrIcon} alt="QR Leser" />
          </button>
        </>
      )}
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
          walkingSpeed={walkingSpeed}
        ></LMap>
      ) : null}
    </>
  );
}

export default App;
