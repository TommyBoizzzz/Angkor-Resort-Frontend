import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// User Pages
import Dashboard from "./pages/dashboard/dashboard";
import ProfileSetting from "./pages/settings/profile";
import RoomDetails from "./pages/rooms/roomdetail";
import Payment from "./pages/booking/payment";


// Admin
import AdminHome from "./admin/pages/dashboard";

// Protected Route
import AdminRoute from "./admin/routes/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route path="/profile" element={<ProfileSetting />} />
        <Route path="/roomdetail/:roomId" element={<RoomDetails />} />
        <Route path="/payment" element={<Payment />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;