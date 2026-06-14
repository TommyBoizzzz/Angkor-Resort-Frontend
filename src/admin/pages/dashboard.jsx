import { useState } from "react";

import { AdminHeader } from "../../components/admin/AdminHeader";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminDashboard } from "../../components/admin/AdminDashboard";
import { AdminRooms } from "../../components/admin/AdminRooms";
import { AdminGuests } from "../../components/admin/AdminGuests";
import { AdminBookings } from "../../components/admin/AdminBookings";
import { AdminPayments } from "../../components/admin/AdminPayments";
import { AdminReviews } from "../../components/admin/AdminReviews";

function AdminHome() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [page, setPage] = useState("dashboard");

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
          {page === "reviews" && <AdminReviews />}
        </main>

      </div>

    </div>
  );
}

export default AdminHome;