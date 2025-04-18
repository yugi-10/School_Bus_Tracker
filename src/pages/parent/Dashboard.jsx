import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParentSidebar from "../../components/ParentSidebar";
import KidCard from "../../components/KidCard";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function ParentDashboard() {
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  const kids = [
    { 
      name: "Arya Smith", 
      grade: "5", 
      busNo: "BUS-42", 
      status: "Onboard",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",  
      additionalInfo: "Enjoys reading books and playing soccer."
    },
    { 
      name: "John Smith", 
      grade: "3", 
      busNo: "BUS-42", 
      status: "Waiting",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",  
      additionalInfo: "Loves drawing and playing video games."
    },
  ];

  const busCoordinates = { lat: 28.6139, lng: 77.2090 };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
        },
        () => {
          alert("Geolocation failed. Using default location.");
          setUserLocation({ lat: 28.6139, lng: 77.2090 });
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const userPinIcon = new L.Icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Map_marker_icon_%28location%29.png", 
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const busPinIcon = new L.Icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Bus_marker_icon.png", 
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#1c1c1c] via-[#434343] to-[#000000]">
      <ParentSidebar selected={selectedPage} setSelected={setSelectedPage} />

      <main className="flex-1 p-8 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-orbitron">Parent Dashboard</h1>
          <div>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold hover:bg-yellow-300 mr-4">
              Contact Driver
            </button>
            <button
              className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold hover:bg-yellow-300"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>

        {selectedPage === "Dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kids.map((kid, i) => (
              <KidCard key={i} {...kid} />
            ))}

            <div className="col-span-full h-64 rounded-2xl overflow-hidden border-2 border-dashed border-gray-500">
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
                  <Marker position={[userLocation.lat, userLocation.lng]} icon={userPinIcon}>
                    <Popup>
                      Your Current Location <br />
                      Latitude: {userLocation.lat.toFixed(4)} <br />
                      Longitude: {userLocation.lng.toFixed(4)}
                    </Popup>
                  </Marker>
                )}

                <Marker position={[busCoordinates.lat, busCoordinates.lng]} icon={busPinIcon}>
                  <Popup>
                    Bus is here! <br />
                    Latitude: {busCoordinates.lat} <br />
                    Longitude: {busCoordinates.lng}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}

        {selectedPage === "Notifications" && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md">
            <h2 className="text-xl mb-4">Notifications</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>🚍 Arya's bus delayed by 5 minutes</li>
              <li>✅ John boarded the bus</li>
            </ul>
          </div>
        )}

        {selectedPage === "Profile" && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-md">
            <h2 className="text-xl mb-4">Student Profiles</h2>
            {kids.map((kid, index) => (
              <div key={index} className="flex items-center mb-6">
                <img 
                  src={kid.profilePic} 
                  alt="Student Profile"
                  className="w-24 h-24 rounded-full mr-6"
                />
                <div>
                  <h3 className="text-xl font-semibold">{kid.name}</h3>
                  <p className="text-gray-300">Grade: {kid.grade}</p>
                  <p className="text-gray-300">Bus No: {kid.busNo}</p>
                  <p className="text-gray-300">Status: {kid.status}</p>
                  <p className="mt-4 text-gray-400">{kid.additionalInfo}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
