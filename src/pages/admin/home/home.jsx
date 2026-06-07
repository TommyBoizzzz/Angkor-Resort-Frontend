import { useEffect, useState } from "react";
import RoomService from "../service/RoomService";
import "./css/home.css";

function AdminHome() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const response = await RoomService.getAllRooms();
      setRooms(response.data);
    } catch (error) {
      console.error("Failed to load rooms:", error);
    } finally {
      setLoading(false);
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
    <div className="admin-home">

      <div className="page-header">
        <h1>Hotel Dashboard</h1>
        <p>Welcome back, Administrator 👋</p>
      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card total">
          <h3>Total Rooms</h3>
          <span>{totalRooms}</span>
        </div>

        <div className="stat-card available">
          <h3>Available Rooms</h3>
          <span>{availableRooms}</span>
        </div>

        <div className="stat-card booked">
          <h3>Booked Rooms</h3>
          <span>{bookedRooms}</span>
        </div>

        <div className="stat-card customers">
          <h3>Total Customers</h3>
          <span>0</span>
        </div>

      </div>

      {/* Room Table */}
      <div className="table-section">

        <div className="table-header">
          <h2>Room List</h2>
        </div>

        {loading ? (
          <p>Loading rooms...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {rooms.length > 0 ? (
                rooms.map(room => (
                  <tr key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.roomNumber}</td>
                    <td>{room.roomType}</td>
                    <td>${room.price}</td>
                    <td>
                      <span
                        className={
                          room.status?.toLowerCase() === "available"
                            ? "status available"
                            : "status booked"
                        }
                      >
                        {room.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No rooms found</td>
                </tr>
              )}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}

export default AdminHome;