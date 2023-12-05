import OpenStreetMap from "./components/map";
import "./App.css";

function App() {
  return (
    <>
      <h1>Meine OpenStreetMap</h1>
      <OpenStreetMap
        center={{ lat: 49.43496, lng: 11.86785 }}
        zoom={17}
        style={{ height: "400px", width: "100%" }}
      />
    </>
  );
}

export default App;
