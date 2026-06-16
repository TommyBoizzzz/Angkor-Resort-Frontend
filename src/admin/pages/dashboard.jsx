import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminHeader } from "../screens/AdminHeader";
import { AdminSidebar } from "../screens/AdminSidebar";
import { AdminDashboard } from "../screens/AdminDashboard";
import { AdminRooms } from "../screens/AdminRooms";
import { AdminGuests } from "../screens/AdminGuests";
import { AdminBookings } from "../screens/AdminBookings";
import { AdminPayments } from "../screens/AdminPayments";

function AdminHome() {
  const navigate = useNavigate();

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [page, setPage] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="admin-layout">
      <AdminHeader
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />

      <div className="admin-content">
        <AdminSidebar
          sidebarVisible={sidebarVisible}
          page={page}
          setPage={setPage}
          handleLogout={handleLogout}
        />

        <main
          className={
            sidebarVisible
              ? "admin-main sidebar-open"
              : "admin-main"
          }
        >
          {page === "dashboard" && <AdminDashboard />}
          {page === "rooms" && <AdminRooms />}
          {page === "guests" && <AdminGuests />}
          {page === "bookings" && <AdminBookings />}
          {page === "payments" && <AdminPayments />}
        </main>
      </div>
    </div>
  );
}

export default AdminHome;