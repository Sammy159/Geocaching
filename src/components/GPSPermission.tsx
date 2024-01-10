import { useState, useEffect } from "react";

function GPSPermissionQuery(): JSX.Element {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Hier prüfen wir, ob der Benutzer bereits die Berechtigung erteilt hat
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation(position.coords);
            },
            (error) => {
              console.error("Fehler beim Abrufen des Standorts:", error);
            }
          );
        } else if (result.state === "prompt") {
          // Der Benutzer wurde zur Berechtigung aufgefordert
          console.log(
            "Der Benutzer wurde zur Standortberechtigung aufgefordert."
          );
        } else {
          console.error("Der Benutzer hat die Standortberechtigung abgelehnt.");
        }
      });
    } else {
      console.error("Geolokalisierung wird nicht unterstützt.");
    }
  }, []);

  return (
    <div>
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>Standortdaten werden geladen...</p>
      )}
    </div>
  );
}

export default GPSPermissionQuery;
