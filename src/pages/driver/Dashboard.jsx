import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DriverSidebar from "../../components/DriverSidebar";
import TripStatusCard from "../../components/TripStatusCard";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DriverDashboard = () => {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert("Geolocation failed. Using default location.");
          setUserLocation({
            lat: 28.6139, // Default to New Delhi, India
            lng: 77.2090, // Default to New Delhi, India
          });
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setUserLocation({
        lat: 28.6139, // Default to New Delhi, India
        lng: 77.2090, // Default to New Delhi, India
      });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // Use the default Leaflet marker icon
  const pinIcon = new L.Icon.Default();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#000428] via-[#004e92] to-[#000428]">
      <DriverSidebar current={currentPage} setCurrent={setCurrentPage} />

      <main className="flex-1 p-8 text-white overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold font-orbitron">Driver Dashboard</h1>
          <div>
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all mr-4">
              Emergency Alert
            </button>
            <button
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>

        {currentPage === "Dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TripStatusCard />

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center shadow-md">
              <h3 className="text-xl font-semibold mb-4">Live Bus Location</h3>

              <div className="h-56 w-full rounded-lg relative overflow-hidden border-2 border-dashed border-gray-500 bg-gray-700 flex justify-center items-center">
                {userLocation ? (
                  <div className="absolute z-10 text-center text-white">
                    <p className="font-bold text-lg">🚌 Bus is here</p>
                    <p>Latitude: {userLocation.lat.toFixed(4)}</p>
                    <p>Longitude: {userLocation.lng.toFixed(4)}</p>
                  </div>
                ) : (
                  <p className="text-gray-400">Loading your location...</p>
                )}

                <MapContainer
                  center={userLocation ? [userLocation.lat, userLocation.lng] : [28.6139, 77.2090]} 
                  zoom={13}
                  style={{ width: "100%", height: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  {userLocation && (
                    <Marker
                      position={[userLocation.lat, userLocation.lng]}
                      icon={pinIcon}
                    >
                      <Popup>
                        Bus is here! <br />
                        Latitude: {userLocation.lat.toFixed(4)} <br />
                        Longitude: {userLocation.lng.toFixed(4)}
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
            </div>
          </div>
        )}

        {currentPage === "Attendance" && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md">
            <h2 className="text-xl mb-4">Student Attendance</h2>
            <p className="text-gray-300">[ Attendance feature coming soon... ]</p>
          </div>
        )}

        {currentPage === "Trip History" && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md">
            <h2 className="text-xl mb-4">Trip History</h2>
            <p className="text-gray-300">[ Trip logs coming soon... ]</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DriverDashboard;
