import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Helper function to format time in HH:MM:SS
const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export default function TripStatusCard({ busId, routeName }) {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Start the timer once the trip starts
  useEffect(() => {
    let timerInterval;

    if (isActive) {
      setStartTime(Date.now());
      timerInterval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      clearInterval(timerInterval);
      setElapsedTime(0); // Reset when trip is not active
    }

    return () => clearInterval(timerInterval);
  }, [isActive, startTime]);

  // Handle trip start/stop
  const toggleTripStatus = () => {
    if (isActive) {
      setShowConfirmation(true); // Show confirmation dialog when trying to end the trip
    } else {
      setIsActive(true); // Start the trip
    }
  };

  const handleEndTrip = () => {
    setIsActive(false);
    setShowConfirmation(false); // Close confirmation modal
  };

  const handleCancelEndTrip = () => {
    setShowConfirmation(false); // Close confirmation modal without ending the trip
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-white shadow-md"
    >
      <h3 className="text-xl mb-3 font-semibold">Trip Status</h3>
      <p className="mb-2">Bus: 01<span className="font-bold">{busId}</span></p>
      <p className="mb-4">Route: VIT Road<span className="font-bold">{routeName}</span></p>

      <p className="text-gray-300 mb-3">Elapsed Time: {formatTime(elapsedTime)}</p>

      {/* Progress Bar */}
      {isActive && (
        <div className="w-full bg-gray-500 rounded-full h-2 mb-3">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${(elapsedTime % 1000) / 1000 * 100}%` }} // Just a simple example of progress
          ></div>
        </div>
      )}

      {/* Button to toggle trip status */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleTripStatus}
        className={`w-full py-3 rounded-xl font-bold text-lg transition ${
          isActive
            ? "bg-red-500 hover:bg-red-400 text-white"
            : "bg-green-500 hover:bg-green-400 text-white"
        }`}
      >
        {isActive ? "End Trip" : "Start Trip"}
      </motion.button>

      {/* Confirmation Modal for End Trip */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-black rounded-xl p-6 shadow-xl w-1/3"
          >
            <h4 className="text-lg font-semibold mb-4">Are you sure you want to end the trip?</h4>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-400 transition"
                onClick={handleEndTrip}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-400 transition"
                onClick={handleCancelEndTrip}
              >
                No
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
