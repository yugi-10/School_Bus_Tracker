import React, { useState, useEffect } from "react";
import BusLocationMap from "./BusLocationMap"; // Import the BusLocationMap component

export default function ManageBuses() {
  const [buses, setBuses] = useState([
    { name: "Bus 1", location: { lat: 28.6139, lng: 77.2090 }, showLocation: false },
    { name: "Bus 2", location: { lat: 19.0760, lng: 72.8777 }, showLocation: false },
    { name: "Bus 3", location: { lat: 13.0827, lng: 80.2707 }, showLocation: false },
  ]);
  const [newBus, setNewBus] = useState("");
  const [error, setError] = useState("");
  const [liveLocation, setLiveLocation] = useState(null);

  // Get the live location of the user (for demonstration purposes)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLiveLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    }
  }, []);

  const handleAddBus = () => {
    if (!newBus.trim()) {
      setError("Bus name cannot be empty.");
      return;
    }

    setBuses((prevBuses) => [
      ...prevBuses,
      { name: newBus, location: { lat: 0, lng: 0 }, showLocation: false },
    ]);
    setNewBus(""); // Clear the input after adding
    setError(""); // Reset error
  };

  const handleViewLocation = (index) => {
    setBuses((prevBuses) => {
      const updatedBuses = [...prevBuses];
      updatedBuses[index].showLocation = !updatedBuses[index].showLocation;
      return updatedBuses;
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-white mb-6">Manage Buses</h2>

      {/* Error message */}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {/* Bus List */}
      <ul className="space-y-4 mb-6">
        {buses.map((bus, index) => (
          <li key={index} className="bg-white p-3 rounded-md shadow-md flex justify-between items-center">
            <span className="text-lg font-medium">{bus.name}</span>

            <div className="flex space-x-4">
              {/* View Location Button */}
              <button
                onClick={() => handleViewLocation(index)}
                className="text-blue-500 hover:text-blue-700"
              >
                {bus.showLocation ? "Hide Location" : "View Location"}
              </button>

              {/* Delete Button */}
              <button
                onClick={() => {
                  setBuses(buses.filter((_, i) => i !== index)); // Remove bus from list
                }}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>

            {/* Display Location */}
            {bus.showLocation && (
              <div className="mt-2 text-gray-700">
                {/* Use the BusLocationMap component here */}
                <BusLocationMap busLocation={bus.location} liveLocation={liveLocation} />
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Input and Add Button */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newBus}
          onChange={(e) => setNewBus(e.target.value)}
          placeholder="Enter new bus name"
          className="w-full px-4 py-2 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleAddBus}
          className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
        >
          Add Bus
        </button>
      </div>
    </div>
  );
}
