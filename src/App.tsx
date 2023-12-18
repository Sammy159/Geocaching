import "./App.css";
import "./components/button.css";
import MyButton from "./components/Button";
import LMap from "./components/Map2";
import { useState } from "react";
import QrReader from "./components/QRCodeReader";
import qrIcon from "/Icons/outline_qr_code_scanner_black_24dp.png";

function App() {
  const [isHiding, setIsHiding] = useState(false);
  const [showNextScreen, setNextScreen] = useState(false);
  const [showQRReader, setShowQRReader] = useState(false);
  const [qrResult, setQRresult] = useState<string>("");
  function showHidingScreen() {
    setIsHiding(true);
    setNextScreen(true);
  }
  function showSeekingScreen() {
    setIsHiding(false);
    setNextScreen(true);
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
  return (
    <>
      <h1>Geocaching Amberg LGS</h1>
      {!showNextScreen ? (
        <>
          <MyButton text={"Verstecken"} onClick={showHidingScreen}></MyButton>
          <MyButton text={"Suchen"} onClick={showSeekingScreen}></MyButton>
        </>
      ) : (
        <>
          <MyButton text={"Zurück"} onClick={backToHome}></MyButton>
          <button
            onClick={toggleQRReader}
            className="myButton"
            style={{ backgroundColor: "white" }}
          >
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
        <LMap isHiding={isHiding} qrResult={qrResult}></LMap>
      ) : null}
    </>
  );
}

export default App;
