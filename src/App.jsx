import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminHome from "./pages/admin/home/home";
import ProfileSetting from "./pages/settings/profile"
import Booking from "./pages/booking/booking"
import RoomDetail from "./pages/rooms/roomdetail"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/profile" element={<ProfileSetting />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/roomdetail" element={<RoomDetail />} />

        {/* hello world */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;