import LMap from "./Map2";
import Dropdown from "./Dropdown";
import WaypointsComponent from "./gpxParser";

const Container = () => {
  const style = {
    display: "flex",
  };

  const options = ["Cache Baum", "Option 2", "Option 3"];

  const handleOptionSelect = (selectedOption: any) => {
    console.log("Selected option:", selectedOption);
    // Hier kannst du weitere Aktionen mit der ausgewählten Option durchführen
  };

  return (
    <div style={style}>
      <WaypointsComponent></WaypointsComponent>
      <LMap></LMap>
      <Dropdown options={options} onSelect={handleOptionSelect} />
    </div>
  );
};

export default Container;
