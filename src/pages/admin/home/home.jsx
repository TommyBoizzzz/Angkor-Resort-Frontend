import { useEffect, useState } from "react";
import RoomService from "../service/RoomService";
import "./css/home.css";

function AdminHome() {
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const response = await RoomService.getAllRooms();
      setRooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalRooms = rooms.length;

  const availableRooms = rooms.filter(
    room => room.status?.toLowerCase() === "available"
  ).length;

  const bookedRooms = rooms.filter(
    room => room.status?.toLowerCase() === "booked"
  ).length;

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <div className="sidebar">

        <h2>🏨 Hotel Admin</h2>

        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          className={activeTab === "rooms" ? "active" : ""}
          onClick={() => setActiveTab("rooms")}
        >
          🛏 Rooms
        </button>

        <button
          className={activeTab === "customers" ? "active" : ""}
          onClick={() => setActiveTab("customers")}
        >
          👤 Customers
        </button>

        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          📖 Bookings
        </button>

        <button
          className={activeTab === "payments" ? "active" : ""}
          onClick={() => setActiveTab("payments")}
        >
          💳 Payments
        </button>

        <button
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => setActiveTab("reports")}
        >
          📈 Reports
        </button>

      </div>

      {/* Content */}
      <div className="content">

        {activeTab === "dashboard" && (
          <>
            <h1>Dashboard</h1>

            <div className="stats-grid">

              <div className="card blue">
                <h3>Total Rooms</h3>
                <span>{totalRooms}</span>
              </div>

              <div className="card green">
                <h3>Available</h3>
                <span>{availableRooms}</span>
              </div>

              <div className="card red">
                <h3>Booked</h3>
                <span>{bookedRooms}</span>
              </div>

              <div className="card orange">
                <h3>Customers</h3>
                <span>0</span>
              </div>

            </div>
          </>
        )}

        {activeTab === "rooms" && (
          <>
            <h1>Room Management</h1>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Room No</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {rooms.map(room => (
                  <tr key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.roomNumber}</td>
                    <td>{room.roomType}</td>
                    <td>${room.price}</td>
                    <td>{room.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "customers" && (
          <h1>Customer Management</h1>
        )}

        {activeTab === "bookings" && (
          <h1>Booking Management</h1>
        )}

        {activeTab === "payments" && (
          <h1>Payment Management</h1>
        )}

        {activeTab === "reports" && (
          <h1>Reports & Analytics</h1>
        )}

      </div>

    </div>
  );
}

export default AdminHome;