import "./App.css";
import Container from "./components/table_container";
import GpxParserComponent from "./components/gpxParser";

function App() {
  return (
    <>
      <h1>Geocaching Amberg</h1>
      <Container></Container>
      <GpxParserComponent />
    </>
  );
}

export default App;
