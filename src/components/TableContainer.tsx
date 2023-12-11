import LMap from "./Map2";
import Dropdown from "./Dropdown";
import L from "leaflet";
import { CalcDistance } from "./Calculations";
import { getCurrentPosition } from "./Map2";

const TableContainer = () => {
  const style = {
    display: "flex",
  };

  let currentPosition: L.LatLng | null = null;

  const options = ["Cache Baum", "Option 2", "Option 3"];

  const handleOptionSelect = (selectedOption: any) => {
    console.log("Selected option:", selectedOption);
    //calc LatLon for Cache
    //jetztige Position bestimmen
    currentPosition = getCurrentPosition() || null;

    //add Marker to Map
    //save LatLon with Cache Name in local Storage
  };

  return (
    <div style={style}>
      <LMap></LMap>
      <Dropdown options={options} onSelect={handleOptionSelect} />
    </div>
  );
};

export default TableContainer;
