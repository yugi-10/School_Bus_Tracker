import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/auth/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ParentDashboard from "./pages/parent/Dashboard";
import DriverDashboard from "./pages/driver/Dashboard";
import SignOut from "./components/pages/auth/SignOut";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Login />} />

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        
        {/* Admin Dashboard with Nested Routes */}
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />

        {/* SignOut Route */}
        <Route path="/signout" element={<SignOut />} />
      </Routes>
    </Router>
  );
}

export default App;
