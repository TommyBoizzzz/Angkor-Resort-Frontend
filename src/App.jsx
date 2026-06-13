import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/dashboard/dashboard";
import AdminHome from "./admin/pages/dashboard";
import ProfileSetting from "./pages/settings/profile";
import Booking from "./pages/booking/booking";
import Payment from "./pages/booking/payment";
// import RoomDetails from "./components/room-details";
// import RoomDetail from "./pages/rooms/roomdetail";

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
        <Route path="/payment" element={<Payment />} />
        {/* <Route path="/roomdetail" element={<RoomDetail />} /> */}
        {/* <Route path="/room-details/:roomId" element={<RoomDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
