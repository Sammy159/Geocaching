import { useState, useEffect } from "react";

interface GPSProps {
  setLocation: (coords: GeolocationCoordinates | null) => void;
}

const GPSPermissionQuery: React.FC<GPSProps> = ({ setLocation }) => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then(() => {
        navigator.geolocation.getCurrentPosition(
          () => {
            navigator.geolocation.watchPosition(
              (position: GeolocationPosition) => {
                setLocation(position.coords);
                setText(String(position.coords));
              }
            );
          },
          (error) => {
            console.error("Fehler beim Abrufen des Standorts:", error);
            setText("Fehler beim Abrufen des Standorts.");
          }
        );
      });
    } else {
      setText("Fehler bei der Standortberechtigung.");
      console.error("Geolokalisierung wird nicht unterstützt.");
    }
  }, []);

  return <div>{text}</div>;
};

export default GPSPermissionQuery;
