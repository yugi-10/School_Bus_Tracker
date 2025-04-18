import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import ManageBuses from "./ManageBuses";
import ManageDrivers from "./ManageDrivers";
import ManageStudents from "./ManageStudents";  
import Reports from "./Reports";  // Import the Reports component
import StatCard from "../../components/StatCard";
import MapView from "../../components/MapView";
import Topbar from "../../components/Topbar";
import { FaBusAlt, FaUserTie, FaChild } from "react-icons/fa";

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const navigate = useNavigate();

  // Update the current page and navigate based on the clicked item
  const handleNavigate = (page) => {
    setCurrentPage(page); // Update current page state
    if (page === "Dashboard") navigate("/admin-dashboard");
    if (page === "Manage Buses") navigate("/admin-dashboard/manage-buses");
    if (page === "Manage Drivers") navigate("/admin-dashboard/manage-drivers");
    if (page === "Manage Students") navigate("/admin-dashboard/manage-students");
    if (page === "Reports") navigate("/admin-dashboard/reports"); // Added Reports route
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#1f1c2c] via-[#928DAB] to-[#1f1c2c]">
      <AdminSidebar currentPage={currentPage} onNavigate={handleNavigate} onSignOut={handleSignOut} />

      <main className="flex-1 p-8">
        <Topbar />
        <Routes>
          {/* Default dashboard page */}
          <Route
            path="/"
            element={
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <StatCard title="Total Buses" value="12" icon={<FaBusAlt />} />
                  <StatCard title="Total Drivers" value="8" icon={<FaUserTie />} />
                  <StatCard title="Total Students" value="240" icon={<FaChild />} />
                </div>
                <MapView />
              </>
            }
          />
          {/* Manage Buses Route */}
          <Route path="/manage-buses" element={<ManageBuses />} />
          {/* Manage Drivers Route */}
          <Route path="/manage-drivers" element={<ManageDrivers />} />
          {/* Manage Students Route */}
          <Route path="/manage-students" element={<ManageStudents />} />
          {/* Reports Route */}
          <Route path="/reports" element={<Reports />} /> {/* Added the Reports route */}
        </Routes>
      </main>
    </div>
  );
}
