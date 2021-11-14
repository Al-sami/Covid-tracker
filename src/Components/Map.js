import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { showCircleOnMap } from "../util";
import "./Map.css";

function Map({ countries, casestype, center, zoom }) {
  const [map, setmap] = useState(null);
  if (map) {
    map.setView(center, zoom);
  }

  return (
    <MapContainer
      className="map"
      center={center}
      zoom={zoom}
      whenCreated={setmap}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showCircleOnMap(countries, casestype)}
    </MapContainer>
  );
}

export default Map;
