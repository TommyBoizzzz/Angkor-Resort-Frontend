import { useState } from "react";
import "../css/dashboard.css";

function AdminHome() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

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
          <li>📊 Dashboard</li>
          <li>🛏 Rooms</li>
          <li>👤 Guests</li>
          <li>📅 Bookings</li>
          <li>💳 Payments</li>
          {/* <li>🧹 Housekeeping</li>
          <li>⚙ Settings</li> */}\


          
        </ul>
      </aside>

      {/* MAIN */}
      <main
        className={`db-main ${
          sidebarVisible ? "db-main-open" : "db-main-close"
        }`}
      >
        <h1 className="db-title">
          Hotel Dashboard Overview
        </h1>

        <div className="db-card-grid">

          <div className="db-card">
            <h3>Total Rooms</h3>
            <h1>120</h1>
          </div>

          <div className="db-card">
            <h3>Active Bookings</h3>
            <h1>45</h1>
          </div>

          <div className="db-card">
            <h3>Available Rooms</h3>
            <h1>30</h1>
          </div>

          <div className="db-card">
            <h3>Monthly Revenue</h3>
            <h1>$12,300</h1>
          </div>

        </div>

        <div className="db-chart-row">

          <div className="db-chart-box">
            <h3>Booking Statistics</h3>
          </div>

          <div className="db-chart-box">
            <h3>Revenue Growth</h3>
          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminHome;