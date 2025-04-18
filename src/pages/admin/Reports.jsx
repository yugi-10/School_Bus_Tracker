// src/pages/admin/Reports.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { FaChartBar, FaBusAlt, FaUserTie, FaChild } from "react-icons/fa";

// ✅ Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Reports() {
  const busData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Buses in Service',
        data: [12, 15, 18, 20, 22, 23, 24, 26, 25, 23, 21, 20],
        borderColor: '#4bc0c0',
        tension: 0.3,
        pointBackgroundColor: '#4bc0c0',
        fill: false,
      },
    ],
  };

  const driverData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Active Drivers',
        data: [8, 9, 9, 8, 7, 7, 6, 6, 5, 6, 6, 7],
        borderColor: '#ff9f40',
        tension: 0.3,
        pointBackgroundColor: '#ff9f40',
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-8 text-center text-yellow-300">Reports Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/10 p-6 rounded-lg shadow-md backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <FaBusAlt size={36} className="text-yellow-400" />
            <h3 className="text-lg font-medium">Bus Report</h3>
          </div>
          <p>Total Buses: 12</p>
          <p>Active Buses: 8</p>
          <p>Inactive Buses: 4</p>
        </div>

        <div className="bg-white/10 p-6 rounded-lg shadow-md backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <FaUserTie size={36} className="text-green-400" />
            <h3 className="text-lg font-medium">Driver Report</h3>
          </div>
          <p>Total Drivers: 8</p>
          <p>Active Drivers: 6</p>
          <p>Inactive Drivers: 2</p>
        </div>

        <div className="bg-white/10 p-6 rounded-lg shadow-md backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <FaChild size={36} className="text-blue-400" />
            <h3 className="text-lg font-medium">Student Report</h3>
          </div>
          <p>Total Students: 240</p>
          <p>Students Attending: 220</p>
          <p>Students Absent: 20</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm">
          <h3 className="text-xl font-medium mb-4">Bus in Service (Monthly)</h3>
          <Line data={busData} options={{ responsive: true }} />
        </div>

        <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm">
          <h3 className="text-xl font-medium mb-4">Active Drivers (Monthly)</h3>
          <Line data={driverData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}
