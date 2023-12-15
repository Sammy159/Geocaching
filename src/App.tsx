import "./App.css";
import MyButton from "./components/Button";
//import ShowHidingScreen from "./components/hideAndSeek";
import { CacheManagerProvider } from "./context/CacheManagerContext";
import { useState } from "react";

function App() {
  const [isHiding, setIsHiding] = useState(false);
  const [showNextScreen, setNextScreen] = useState(false);
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
  return (
    <>
      <h1>Geocaching Amberg LGS</h1>
      {!showNextScreen ? (
        <>
          <MyButton text={"Verstecken"} onClick={showHidingScreen}></MyButton>
          <MyButton text={"Suchen"} onClick={showSeekingScreen}></MyButton>
        </>
      ) : (
        <MyButton text={"Zurück"} onClick={backToHome}></MyButton>
      )}

      {showNextScreen ? (
        <CacheManagerProvider isHiding={isHiding}></CacheManagerProvider>
      ) : null}
    </>
  );
}

export default App;
