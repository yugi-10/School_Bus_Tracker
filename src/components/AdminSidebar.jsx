import React from 'react';

export default function AdminSidebar({ currentPage, onNavigate, onSignOut }) {
  const navItems = ["Dashboard", "Manage Buses", "Manage Drivers", "Manage Students", "Reports"];

  return (
    <div className="bg-white/10 backdrop-blur-md text-white p-4 min-h-screen w-64 shadow-xl">
      <h2 className="text-xl font-orbitron mb-6 text-yellow-400">Admin</h2>
      <ul className="space-y-3">
        {navItems.map((item) => (
          <li
            key={item}
            onClick={() => onNavigate(item)} // Trigger the onNavigate function when clicked
            className={`cursor-pointer px-3 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition ${
              currentPage === item ? "bg-yellow-400 text-black" : "text-white"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Sign-out button */}
      <button
        onClick={onSignOut}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
