import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// User Pages
import Dashboard from "./pages/dashboard/dashboard";
import ProfileSetting from "./pages/settings/profile";
import Booking from "./pages/booking/booking";
import Payment from "./pages/booking/payment";

// Admin
import AdminHome from "./admin/pages/dashboard";

// import RoomDetail from "./pages/rooms/roomdetail";
// import RoomDetails from "./components/room-details";

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
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminHome />} />

        {/* Future */}
        {/* <Route path="/roomdetail" element={<RoomDetail />} /> */}
        {/* <Route path="/room-details/:roomId" element={<RoomDetails />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;