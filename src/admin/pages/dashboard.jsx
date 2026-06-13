import { useState } from "react";
import "../css/dashboard.css";

function AdminHome() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [page, setPage] = useState("dashboard");

  return (
    <div className="db-wrapper">

      {/* HEADER */}
      <header className="db-header">

        <div className="db-header-left">
          <button
            className="db-menu-btn"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          >
            ☰
          </button>

          <h2>Angkor Resort Admin</h2>
        </div>

        <div className="db-header-right">
          <span>👤 Admin</span>
        </div>

      </header>

      {/* SIDEBAR */}
      <aside
        className={`db-sidebar ${
          sidebarVisible ? "db-sidebar-show" : "db-sidebar-hide"
        }`}
      >
        <ul className="db-menu-list">

          <li onClick={() => setPage("dashboard")}>📊 Dashboard</li>
          <li onClick={() => setPage("rooms")}>🛏 Rooms</li>
          <li onClick={() => setPage("guests")}>👤 Guests</li>
          <li onClick={() => setPage("bookings")}>📅 Bookings</li>
          <li onClick={() => setPage("payments")}>💳 Payments</li>
          <li onClick={() => setPage("reviews")}>⭐ Reviews</li>

        </ul>
      </aside>

      {/* MAIN */}
      <main
        className={`db-main ${
          sidebarVisible ? "db-main-open" : "db-main-close"
        }`}
      >

        {/* ================= DASHBOARD ================= */}
        {page === "dashboard" && (
          <>
            <h1 className="db-title">Dashboard Overview</h1>

            <div className="db-card-grid">

              <div className="db-card">
                <h3>Total Rooms</h3>
                <h1>120</h1>
              </div>

              <div className="db-card">
                <h3>Guests</h3>
                <h1>350</h1>
              </div>

              <div className="db-card">
                <h3>Active Bookings</h3>
                <h1>45</h1>
              </div>

              <div className="db-card">
                <h3>Payments</h3>
                <h1>$12,300</h1>
              </div>

              <div className="db-card">
                <h3>Available Rooms</h3>
                <h1>30</h1>
              </div>

              <div className="db-card">
                <h3>Reviews</h3>
                <h1>4.8 ⭐</h1>
              </div>

            </div>
          </>
        )}

        {/* ================= ROOMS ================= */}
        {page === "rooms" && (
          <>
            <h1 className="db-title">Rooms Management</h1>

            <div className="db-table-box">
              <table className="db-table">

                <thead>
                  <tr>
                    <th>Room No</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>101</td>
                    <td>Deluxe</td>
                    <td>$120</td>
                    <td className="status booked">Booked</td>
                  </tr>

                  <tr>
                    <td>102</td>
                    <td>Standard</td>
                    <td>$80</td>
                    <td className="status checked">Available</td>
                  </tr>

                  <tr>
                    <td>103</td>
                    <td>Suite</td>
                    <td>$200</td>
                    <td className="status pending">Maintenance</td>
                  </tr>
                </tbody>

              </table>
            </div>
          </>
        )}

        {/* ================= GUESTS ================= */}
        {page === "guests" && (
          <>
            <h1 className="db-title">Guests</h1>

            <div className="db-table-box">
              <table className="db-table">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Room</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>012 345 678</td>
                    <td>john@gmail.com</td>
                    <td>101</td>
                  </tr>

                  <tr>
                    <td>Sarah Kim</td>
                    <td>098 765 432</td>
                    <td>sarah@gmail.com</td>
                    <td>102</td>
                  </tr>
                </tbody>

              </table>
            </div>
          </>
        )}

        {/* ================= BOOKINGS ================= */}
        {page === "bookings" && (
          <>
            <h1 className="db-title">Bookings</h1>

            <div className="db-table-box">
              <table className="db-table">

                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>101</td>
                    <td>2026-06-10</td>
                    <td className="status booked">Booked</td>
                  </tr>

                  <tr>
                    <td>Sarah Kim</td>
                    <td>102</td>
                    <td>2026-06-11</td>
                    <td className="status checked">Checked In</td>
                  </tr>
                </tbody>

              </table>
            </div>
          </>
        )}

        {/* ================= PAYMENTS ================= */}
        {page === "payments" && (
          <>
            <h1 className="db-title">Payments</h1>

            <div className="db-card-grid">

              <div className="db-card">
                <h3>Total Revenue</h3>
                <h1>$12,300</h1>
              </div>

              <div className="db-card">
                <h3>Pending Payments</h3>
                <h1>$2,100</h1>
              </div>

              <div className="db-card">
                <h3>Paid Bookings</h3>
                <h1>98</h1>
              </div>

            </div>
          </>
        )}

        {/* ================= REVIEWS ================= */}
        {page === "reviews" && (
          <>
            <h1 className="db-title">Reviews</h1>

            <div className="db-reviews">

              <div className="db-review-item">
                ⭐⭐⭐⭐⭐ Amazing service and clean rooms
                <span>- John D.</span>
              </div>

              <div className="db-review-item">
                ⭐⭐⭐⭐ Very comfortable stay
                <span>- Sarah K.</span>
              </div>

              <div className="db-review-item">
                ⭐⭐⭐⭐⭐ Best hotel in the city
                <span>- Michael P.</span>
              </div>

            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default AdminHome;   