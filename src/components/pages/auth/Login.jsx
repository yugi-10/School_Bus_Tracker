import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [role, setRole] = useState("Admin");
  const [phone, setPhone] = useState(""); // State for phone number
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login logic
    localStorage.setItem("authToken", "sampleToken");

    // Navigate based on role
    if (role === "Admin") {
      navigate("/admin-dashboard");
    } else if (role === "Driver") {
      navigate("/driver-dashboard");
    } else if (role === "Parent") {
      // You can also store phone number if needed
      localStorage.setItem("phoneNumber", phone);
      navigate("/parent-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 max-w-md w-full text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-6 font-orbitron">School Bus Tracker</h1>

        <div className="flex justify-center mb-4 gap-2">
          {["Admin", "Driver", "Parent"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                role === r
                  ? "bg-yellow-400 text-black shadow-lg"
                  : "bg-white/20 text-white hover:bg-yellow-400 hover:text-black"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-white/10 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-white/10 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Conditionally render phone input if role is Parent */}
          {role === "Parent" && (
            <div>
              <label className="block mb-1 text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                placeholder="+91  Enter your number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                pattern="[0-9]{10}"
                required
              />
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full mt-4 py-2 rounded-xl bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-300 transition"
          >
            Login as {role}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
