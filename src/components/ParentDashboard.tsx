import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Bus, LogOut, User, Baby } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MovingMarker: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);

  return (
    <Marker position={position}>
      <Popup>
        🚌 School Bus #123<br />
        Last updated: {new Date().toLocaleTimeString()}
      </Popup>
    </Marker>
  );
};

const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [busLocation, setBusLocation] = useState<[number, number]>([40.7128, -74.006]);
  const [status, setStatus] = useState('On Route');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocation((prev) => {
        const lat = prev[0] + (Math.random() - 0.5) * 0.001;
        const lng = prev[1] + (Math.random() - 0.5) * 0.001;
        return [lat, lng];
      });
      setLastUpdate(new Date());
      const statuses = ['On Route', 'At Stop', 'Arriving Soon', 'Delayed'];
      if (Math.random() < 0.1) {
        setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bus className="text-blue-600 h-6 w-6" />
            <h1 className="text-xl font-bold text-gray-800">School Bus Tracker</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Bus Tracking Section */}
        <section className="bg-white shadow-xl rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Live Bus Location</h2>
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${status === 'On Route' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm font-medium text-gray-600">{status}</span>
            </div>
          </div>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <MapContainer center={busLocation} zoom={15} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <MovingMarker position={busLocation} />
            </MapContainer>
          </div>
        </section>

        {/* Bus Info Section */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Bus Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p><strong>Bus Number:</strong> #123</p>
              <p><strong>Driver:</strong> John Doe</p>
            </div>
            <div>
              <p><strong>Route:</strong> Morning Route A</p>
              <p><strong>Last Updated:</strong> {lastUpdate.toLocaleTimeString()}</p>
            </div>
            <div className="col-span-2">
              <p className="bg-blue-50 p-3 rounded-md">
                <strong>Current Location:</strong> {busLocation[0].toFixed(4)}, {busLocation[1].toFixed(4)}
              </p>
            </div>
          </div>
        </section>

        {/* Kids Info Section */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Baby className="text-pink-400" /> Kid(s) Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="bg-gray-50 rounded-lg p-4 shadow">
              <p><strong>Name:</strong> Emma Smith</p>
              <p><strong>Grade:</strong> 3rd</p>
              <p><strong>Roll No:</strong> 25</p>
              <p><strong>Stop:</strong> Elm Street Corner</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 shadow">
              <p><strong>Name:</strong> Liam Smith</p>
              <p><strong>Grade:</strong> 1st</p>
              <p><strong>Roll No:</strong> 12</p>
              <p><strong>Stop:</strong> Elm Street Corner</p>
            </div>
          </div>
        </section>

        {/* Driver Info Section */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="text-blue-500" /> Driver Information
          </h3>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Driver"
              className="w-24 h-24 rounded-full border-2 border-blue-400 shadow"
            />
            <div className="space-y-1 text-sm text-gray-700">
              <p><strong>👨‍✈️ Name:</strong> John Doe</p>
              <p><strong>📞 Contact:</strong> +1 (555) 123-4567</p>
              <p><strong>🪪 License ID:</strong> D-7845120</p>
              <p><strong>🚌 Experience:</strong> 8 years</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ParentDashboard;
