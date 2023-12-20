import "leaflet/dist/leaflet.css";
import "leaflet-gpx";
import "./map.css";
import MyGpxParser from "./GpxParser";
import Dropdown from "./Dropdown";
import MyButton from "./Button";
import { useCacheManager } from "../context/CacheManagerContext";
import { CalcDistance } from "./Calculations";
import React, { useEffect, useRef, useState } from "react";
import L, { Map } from "leaflet";

let markerRef: L.Marker | null = null;

interface MapProps {
  isHiding: boolean;
  qrResult: string;
}

const LMap: React.FC<MapProps> = ({ isHiding, qrResult }) => {
  const map = useRef<Map | null>(null);
  const gpxLayerRef = useRef<L.GPX | null>(null);

  const markerWidth: number = 25;
  const markerHeight: number = markerWidth;
  const searchRadius: number = 50;

  const cacheManager = useCacheManager();
  //State zum neu Rendern bei Veränderung der Nummen
  const [cachesLeft, setCachesLeft] = useState(0);

  const iconDict: { [key: string]: string } = {
    Cafe: "./Icons/baseline_local_cafe_black_24dp.png",
    Blume: "./Icons/baseline_local_florist_black_24dp.png",
    Baum: "./Icons/baseline_park_black_24dp.png",
    Wasser: "./Icons/baseline_water_black_24dp.png",
    Wolke: "./Icons/outline_cloud_black_24dp.png",
    Sitzplatz: "./Icons/outline_deck_black_24dp.png",
    Trophäe: "./Icons/outline_emoji_events_black_24dp.png",
    Grill: "./Icons/outline_outdoor_grill_black_24dp.png",
    Ball: "./Icons/outline_sports_soccer_black_24dp.png",
    Fragezeichen: "./Icons/question_mark.png",
  };

  let index = useRef<number>(0);
  let isFirstMarker = useRef<boolean>(true);

  const trackCoordinatesRef = useRef<
    {
      lat: number;
      lon: number;
    }[]
  >([]);
  trackCoordinatesRef.current = MyGpxParser();
  const intervalDelay = 2000;
  let intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const [savedCaches, setSavedCaches] = useState(null);

  const figureIcon = L.icon({
    iconUrl: "./Icons/baseline_directions_walk_black_24dp.png",
    iconSize: [markerWidth, markerHeight],
    iconAnchor: [markerWidth / 2, markerHeight],
    popupAnchor: [-5, -48],
  });

  useEffect(() => {
    addMap();
    loadGPXTrack();
    setNumbOfCachesLeft();
    if (!isHiding) searchingPhase();
  }, []);

  useEffect(() => {
    if (!isHiding) {
      foundCache(qrResult);
    } else {
      if (!cacheManager?.isMarkerPresent(qrResult)) {
        handleCacheSelect(qrResult);
      }
    }
  }, [qrResult]);

  useEffect(() => {
    // Versuchen, Daten aus dem LocalStorage zu holen
    const gespeicherteDaten = localStorage.getItem("Geocaches");

    if (gespeicherteDaten) {
      setSavedCaches(JSON.parse(gespeicherteDaten));
      console.log(savedCaches);
    }
  }, []);

  useEffect(() => {
    saveCachesToLocalStorage();
  }, [cacheManager]);

  function addMap() {
    if (map.current) {
      return;
    }
    map.current = L.map("map").setView([49.44192, 11.85872], 17);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.current);
  }

  function addCacheMarkers(
    latlng: L.LatLng,
    iconName: string,
    saveForLater: boolean
  ) {
    const myIcon = L.icon({
      iconUrl: iconDict[iconName],
      iconSize: [markerWidth, markerHeight],
      iconAnchor: [markerWidth / 2, markerHeight],
      popupAnchor: [-5, -48],
    });

    const marker = L.marker(latlng, { icon: myIcon })
      .addTo(map.current!)
      .bindPopup("<b>" + iconName + "</b>");
    if (saveForLater) {
      cacheManager?.addMarker(iconName, latlng, marker, false);
    }
    setNumbOfCachesLeft();
  }

  function setNumbOfCachesLeft() {
    const numb = cacheManager?.getNumberOfHidden();
    if (numb) setCachesLeft(numb);
  }

  function loadGPXTrack() {
    if (map.current) {
      const gpxFile = "/gartenschau.gpx";

      new L.GPX(gpxFile, {
        async: true,
        gpx_options: { parseElements: ["track", "route", "waypoint"] },
        marker_options: {
          startIconUrl: "leaflet-gpx-icons/pin-icon-start.png",
          endIconUrl: "leaflet-gpx-icons/pin-icon-end.png",
          shadowUrl: "leaflet-gpx-icons/pin-shadow.png",
        },
      })
        .on("loaded", function (e: any) {
          gpxLayerRef.current = e.target;
        })
        .addTo(map.current);
    }
  }

  function startWalk() {
    if (intervalIdRef.current === null) {
      intervalIdRef.current = setInterval(() => {
        if (index.current < trackCoordinatesRef.current.length) {
          const trackLat = trackCoordinatesRef.current[index.current].lat;
          const trackLng = trackCoordinatesRef.current[index.current].lon;
          if (!isHiding) {
            const allCacheNames = cacheManager?.getNames();
            allCacheNames?.forEach((name) => {
              const markerInfo = cacheManager?.getMarkerInfo(name);
              const latlng = markerInfo?.marker.getLatLng();
              if (latlng) {
                //wenn im Umkreis von x Metern, dann Pop-Up und TTS
                if (
                  CalcDistance(trackLat, trackLng, latlng.lat, latlng.lng) <
                  searchRadius
                ) {
                  if (map.current) {
                    //Pop-Up
                    L.popup()
                      .setLatLng([trackLat, trackLng])
                      .setContent("<p>Nah dran!<br />Cache" + name + "</p>")
                      .openOn(map.current);
                    //TTS
                    var speech = new SpeechSynthesisUtterance(name);
                    window.speechSynthesis.speak(speech);
                  }
                }
              }
            });
          }
          // Karte auf den aktuellen Standort zentrieren
          map.current?.setView(L.latLng([trackLat, trackLng]), 20);
          // Marker an den aktuellen Standort setzen
          if (isFirstMarker.current) {
            markerRef = L.marker([trackLat, trackLng], { icon: figureIcon })
              .addTo(map.current!)
              .bindPopup("<b>Aktuelle Position</b>");
            isFirstMarker.current = false;
          } else {
            if (markerRef !== null) {
              markerRef.setLatLng([trackLat, trackLng]);
            }
          }
          index.current++;
        } else {
          if (intervalIdRef.current !== null) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null; // Set to null to indicate that the interval is cleared
          }
          if (index.current == trackCoordinatesRef.current.length) {
            index.current = 0;
          }
        }
      }, intervalDelay);
    }
  }

  function pauseInterval() {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }

  function getCurrentPosition() {
    return markerRef?.getLatLng();
  }

  const handleCacheSelect = (selectedOption: any) => {
    //get current position
    let currentPosition = getCurrentPosition() || null;
    if (currentPosition) {
      //calc LatLon for Cache
      currentPosition["lat"] += 0.00003;
      currentPosition["lng"] += 0.00003;
      const iconName = selectedOption.split(" ");
      if (iconName.length == 2) {
        addCacheMarkers(currentPosition, iconName[1], true);
      } else {
        addCacheMarkers(currentPosition, selectedOption, true);
      }
    }
  };

  function searchingPhase() {
    hideMarkers();
    setNumbOfCachesLeft();
    console.log("searchingPhase");
  }

  function hideMarkers() {
    const allCacheNames = cacheManager?.getNames();
    allCacheNames?.forEach((name) => {
      const markerInfo = cacheManager?.getMarkerInfo(name);
      markerInfo?.marker.setOpacity(0);
    });
  }

  function foundCache(cacheName: string) {
    if (cacheManager?.isMarkerPresent(cacheName)) {
      //wenn Cache im CacheManager vorhanden ist
      cacheManager?.updateMarkerFoundStatus(cacheName, true);
      cacheManager?.updateMarkerTime(cacheName, new Date());
      const latLngMarker = cacheManager?.getMarkerInfo(cacheName)?.latLng;
      if (latLngMarker) addCacheMarkers(latLngMarker, cacheName, false);
    }
  }

  function saveCachesToLocalStorage() {
    const JSONobject = cacheManager?.convertToJSON();
    if (JSONobject) localStorage.setItem("Geocaches", JSONobject);
  }

  return (
    <>
      <div>
        Anzahl {isHiding ? "" : "noch"} versteckter Caches: {cachesLeft}
      </div>
      <div id="map"></div>
      <MyButton text={"Losgehen"} onClick={startWalk} />
      <MyButton text={"Pause"} onClick={pauseInterval} />
      {isHiding ? <Dropdown onSelect={handleCacheSelect} /> : null}
    </>
  );
};

export default LMap;

export function getCurrentPosition() {
  return markerRef?.getLatLng();
}
