import { useEffect, useState } from "react";
import {
  getAllRooms,
  createRoom,
} from "../../services/roomService";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDialog, setShowDialog] = useState(false);

  const [roomData, setRoomData] = useState({
    roomNumber: "",
    roomType: "",
    price: "",
  });

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await getAllRooms();
      setRooms(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load rooms");
    }
  };

  const handleSave = async () => {
    if (
      !roomData.roomNumber ||
      !roomData.roomType ||
      !roomData.price
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const result = await createRoom(roomData);

      alert(result.message);

      if (result.success) {
        setShowDialog(false);

        setRoomData({
          roomNumber: "",
          roomType: "",
          price: "",
        });

        loadRooms();
      }
    } catch (error) {
      console.error(error);
      alert("Create room failed");
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchSearch =
      room.roomNumber
        ?.toString()
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      room.roomType
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" ||
      room.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <>
      <h1 className="db-title">Rooms</h1>

      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Search room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              minWidth: "220px",
            }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <option value="all">All Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="BOOKED">Booked</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
        </div>

        <button
          onClick={() => setShowDialog(true)}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ➕ Add Room
        </button>
      </div>

      {/* Table */}
      <div className="db-table-box">
        <table className="db-table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomType}</td>
                  <td>${room.price}</td>
                  <td>{room.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center" }}
                >
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Room Dialog */}
      {showDialog && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              width: "400px",
              maxWidth: "90%",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <h2>Add Room</h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "15px",
              }}
            >
              <input
                type="text"
                placeholder="Room Number"
                value={roomData.roomNumber}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    roomNumber: e.target.value,
                  })
                }
                style={{ padding: "10px" }}
              />

              <input
                type="text"
                placeholder="Room Type"
                value={roomData.roomType}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    roomType: e.target.value,
                  })
                }
                style={{ padding: "10px" }}
              />

              <input
                type="number"
                placeholder="Price"
                value={roomData.price}
                onChange={(e) =>
                  setRoomData({
                    ...roomData,
                    price: e.target.value,
                  })
                }
                style={{ padding: "10px" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>

              <button onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { AdminRooms };