import React from "react";

const TripStatusCard = () => {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
      <h3 className="text-2xl font-semibold text-center text-white">Trip Status</h3>
      <div className="text-center text-white">
        <p className="mb-2 text-lg font-medium">Status: <span className="text-green-400">In Progress</span></p>
        <p className="mb-2 text-lg font-medium">Next Stop: <span className="text-yellow-400">5 minutes away</span></p>
        <p className="mb-2 text-lg font-medium">Speed: <span className="text-blue-400">40 km/h</span></p>
      </div>
    </div>
  );
};

export default TripStatusCard;
  