import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Bus, LogOut, Phone, User, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Bus {
  id: number;
  driver: string;
  phone: string;
  location: { lat: number; lng: number };
  status: string;
  route: string;
  lastUpdate: Date;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: 1,
      driver: 'John Doe',
      phone: '555-0123',
      location: { lat: 40.7128, lng: -74.006 },
      status: 'On Route',
      route: 'Morning Route A',
      lastUpdate: new Date(),
    },
    {
      id: 2,
      driver: 'Jane Smith',
      phone: '555-0124',
      location: { lat: 40.7148, lng: -74.0068 },
      status: 'At Stop',
      route: 'Morning Route B',
      lastUpdate: new Date(),
    },
    {
      id: 3,
      driver: 'Mike Johnson',
      phone: '555-0125',
      location: { lat: 40.7138, lng: -74.005 },
      status: 'Delayed',
      route: 'Morning Route C',
      lastUpdate: new Date(),
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => ({
          ...bus,
          location: {
            lat: bus.location.lat + (Math.random() - 0.5) * 0.001,
            lng: bus.location.lng + (Math.random() - 0.5) * 0.001,
          },
          lastUpdate: new Date(),
          status:
            Math.random() < 0.1
              ? ['On Route', 'At Stop', 'Delayed', 'Arriving Soon'][
                  Math.floor(Math.random() * 4)
                ]
              : bus.status,
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Route':
        return 'text-green-400';
      case 'At Stop':
        return 'text-yellow-400';
      case 'Delayed':
        return 'text-red-500';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <nav className="bg-opacity-30 backdrop-blur-md shadow-lg py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Bus className="text-cyan-400 w-6 h-6" />
          <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-semibold hover:text-red-400 transition duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>

      <div className="p-6 max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Live Map */}
        <div className="lg:col-span-2 bg-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-4">Live Fleet Tracking</h2>
          <div className="h-[550px] rounded-lg overflow-hidden">
            <MapContainer
              center={[40.7128, -74.006]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              {buses.map((bus) => (
                <Marker
                  key={bus.id}
                  position={[bus.location.lat, bus.location.lng]}
                >
                  <Popup>
                    <strong>Bus #{bus.id}</strong><br />
                    Driver: {bus.driver}<br />
                    Status: {bus.status}<br />
                    Route: {bus.route}<br />
                    <small>
                      Last updated: {bus.lastUpdate.toLocaleTimeString()}
                    </small>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Status Panel */}
        <div className="bg-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-4">Fleet Status</h2>
          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2">
            {buses.map((bus) => (
              <div
                key={bus.id}
                className="bg-white/10 p-4 rounded-xl hover:scale-[1.02] transition transform duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Bus className="text-cyan-400 w-4 h-4" />
                    <span className="text-md font-medium">Bus #{bus.id}</span>
                  </div>
                  <span className={`text-sm font-semibold ${getStatusColor(bus.status)}`}>
                    {bus.status}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="w-4 h-4" />
                    {bus.driver}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-4 h-4" />
                    {bus.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <AlertCircle className="w-4 h-4" />
                    {bus.route}
                  </div>
                  <div className="text-xs text-gray-400 pt-1">
                    Updated: {bus.lastUpdate.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
