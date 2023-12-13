import "./App.css";
import MyButton from "./components/Button";
import ShowHidingScreen from "./components/hideAndSeek";
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
  return (
    <>
      <h1>Geocaching Amberg LGS</h1>
      {
        //TODO: Die Buttons  müssen noch verschwinden sobald man Hide/Seek geht
        //TODO: Zurück zum Menü-Button machen, der angezeigt wird, sobald man in Hide/Seek Phase ist
      }
      <MyButton text={"Verstecken"} onClick={showHidingScreen}></MyButton>
      <MyButton text={"Suchen"} onClick={showSeekingScreen}></MyButton>
      <ShowHidingScreen
        showNextScreen={showNextScreen}
        isHiding={isHiding}
      ></ShowHidingScreen>
    </>
  );
}

export default App;
