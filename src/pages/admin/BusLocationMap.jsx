import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Function to display the map with bus location
const BusLocationMap = ({ busLocation, liveLocation }) => {
  return (
    <MapContainer
      center={busLocation}
      zoom={13}
      style={{ width: "100%", height: "300px" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={busLocation}>
        <Popup>Bus Location</Popup>
      </Marker>

      {/* Live Location Marker if available */}
      {liveLocation && (
        <Marker position={liveLocation}>
          <Popup>Live Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default BusLocationMap;
