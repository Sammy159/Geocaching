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

interface CacheList {
  name: string;
  latLng: L.LatLng;
  found: boolean;
  time: Date;
}

interface MapProps {
  isHiding: boolean;
  qrResult: string;
  radiusSetting: number;
  doSprachausgabe: boolean;
  setCacheList: (list: CacheList[]) => void;
}

/**
 * The LMap component renders a Leaflet map and handles caching-related functionality.
 * @param {MapProps} props - The properties for the LMap component.
 * @returns {JSX.Element} - The rendered LMap component.
 */
const LMap: React.FC<MapProps> = ({
  isHiding,
  qrResult,
  radiusSetting,
  doSprachausgabe,
  setCacheList,
}) => {
  const map = useRef<Map | null>(null);
  const gpxLayerRef = useRef<L.GPX | null>(null);

  const markerWidth: number = 25;
  const markerHeight: number = markerWidth;
  const [searchRadius, setSearchRadius] = useState<number>(50);
  const [isSprachausgabeActive, setSprachausgabeActive] =
    useState<boolean>(true);

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
  const intervalDelay = 1000;
  let intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  //const [savedCaches, setSavedCaches] = useState(null);

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
    setSearchRadius(radiusSetting);
  }, [radiusSetting]);

  useEffect(() => {
    setSprachausgabeActive(doSprachausgabe);
  }, [doSprachausgabe]);

  useEffect(() => {
    saveCachesToLocalStorage();
  }, [cacheManager]);

  useEffect(() => {
    const cacheList: CacheList[] = [];
    const cacheNames = cacheManager?.getNames();

    cacheNames?.forEach((name: any) => {
      const infos = cacheManager?.getMarkerInfo(name);
      if (infos) {
        const cacheItem: CacheList = {
          name: infos.name,
          latLng: infos.latLng,
          found: infos.found,
          time: infos.time ? new Date(infos.time) : new Date(),
        };
        cacheList.push(cacheItem);
      }
    });
    setCacheList(cacheList);
  }, [cachesLeft]);

  /**
   * Adds a Leaflet map to the current DOM element if it doesn't already exist.
   */
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

  /**
   * Adds cache markers to the map.
   * @param {L.LatLng} latlng - The cache's latitude and longitude.
   * @param {string} iconName - The icon name for the cache.
   * @param {boolean} saveForLater - Indicates whether to save the cache for later.
   */
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

  /**
   * Sets the number of hidden caches in the state.
   */
  function setNumbOfCachesLeft() {
    const numb = cacheManager?.getNumberOfHidden();
    if (numb) setCachesLeft(numb);
  }

  /**
   * Loads a GPX track and adds it to the map.
   */
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

  /**
   * Starts the walking interval for tracking and interacting with caches.
   */
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
                    if (isSprachausgabeActive) {
                      var speech = new SpeechSynthesisUtterance(name);
                      window.speechSynthesis.speak(speech);
                    }
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

  /**
   * Pauses the walking interval.
   */
  function pauseInterval() {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }

  /**
   * Gets the current position of the user.
   * @returns {L.LatLng | null} - The current position as a LatLng object or null if not available.
   */
  function getCurrentPosition() {
    return markerRef?.getLatLng();
  }

  /**
   * Handles the selection of a cache from the dropdown.
   * @param {any} selectedOption - The selected cache option.
   */
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

  /**
   * Initiates the searching phase by hiding cache markers.
   */
  function searchingPhase() {
    hideMarkers();
    setNumbOfCachesLeft();
  }

  /**
   * Hides cache markers on the map.
   */
  function hideMarkers() {
    const allCacheNames = cacheManager?.getNames();
    allCacheNames?.forEach((name) => {
      const markerInfo = cacheManager?.getMarkerInfo(name);
      markerInfo?.marker.setOpacity(0);
    });
  }

  /**
   * Marks a cache as found and updates its status on the map.
   * @param {string} cacheName - The name of the found cache.
   */
  function foundCache(cacheName: string) {
    if (cacheManager?.isMarkerPresent(cacheName)) {
      //wenn Cache im CacheManager vorhanden ist
      cacheManager?.updateMarkerFoundStatus(cacheName, true);
      cacheManager?.updateMarkerTime(cacheName, new Date());
      const latLngMarker = cacheManager?.getMarkerInfo(cacheName)?.latLng;
      if (latLngMarker) addCacheMarkers(latLngMarker, cacheName, false);
    }
  }

  /**
   * Saves the caches in JSON format to local storage.
   */
  function saveCachesToLocalStorage() {
    const JSONobject = cacheManager?.convertToJSON();
    if (JSONobject) localStorage.setItem("Geocaches", JSONobject);
  }

  return (
    <div
      style={{
        position: "relative",
        zIndex: 0,
        width: "100%",
        backgroundColor: "#a0b9ac",
      }}
    >
      <div style={{ color: "black" }}>
        Anzahl {isHiding ? "" : "noch"} versteckter Caches: {cachesLeft}
      </div>
      <div id="map"></div>
      <MyButton text={"Losgehen"} onClick={startWalk} />
      <MyButton text={"Pause"} onClick={pauseInterval} />
      {isHiding ? <Dropdown onSelect={handleCacheSelect} /> : null}
    </div>
  );
};

export default LMap;

export function getCurrentPosition() {
  return markerRef?.getLatLng();
}
