import OpenStreetMap from "./map";
import "./App.css";

function App() {
  return (
    <>
      <h1>Meine OpenStreetMap</h1>
      <OpenStreetMap
        center={{ lat: 49.44417, lng: 11.8474 }} // Beispielkoordinaten
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      />
    </>
  );
}

export default App;
