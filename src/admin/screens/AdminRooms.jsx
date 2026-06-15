import { useEffect, useState } from "react";
import {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../Service/RoomService";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showDialog, setShowDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [roomData, setRoomData] = useState({
    id: null,
    roomNumber: "",
    roomType: "",
    price: "",
    status: "AVAILABLE",
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

  // =========================
  // OPEN ADD
  // =========================
  const openAddModal = () => {
    setIsEdit(false);
    setRoomData({
      id: null,
      roomNumber: "",
      roomType: "",
      price: "",
      status: "AVAILABLE",
    });
    setShowDialog(true);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (room) => {
    setIsEdit(true);
    setRoomData(room);
    setShowDialog(true);
  };

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {
    if (!roomData.roomNumber || !roomData.roomType || !roomData.price) {
      alert("Please fill all fields");
      return;
    }

    try {
      let result;

      if (isEdit) {
        result = await updateRoom(roomData.id, roomData);
      } else {
        result = await createRoom(roomData);
      }

      alert(result.message);

      if (result.success) {
        setShowDialog(false);
        loadRooms();
      }
    } catch (error) {
      console.error(error);
      alert("Save failed");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      const result = await deleteRoom(id);
      alert(result.message);

      if (result.success) {
        loadRooms();
      }
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredRooms = rooms.filter((room) => {
    const matchSearch =
      (room.roomNumber || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (room.roomType || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || room.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <>
      <h1 className="db-title">Rooms Management</h1>

      {/* TOP BAR */}
      <div style={topBarStyle}>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            placeholder="Search room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={inputStyle}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={inputStyle}
          >
            <option value="all">All Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="BOOKED">Booked</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
        </div>

        <button className="add-btn" onClick={openAddModal}>
          + Add Room
        </button>
      </div>

      {/* TABLE */}
      <div className="db-table-box">
        <table className="db-table">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomType}</td>
                  <td>${Number(room.price).toLocaleString()}</td>
                  <td>
                    <span className={`status ${room.status}`}>
                      {room.status}
                    </span>
                  </td>

                  {/* ACTION BUTTONS FIXED SPACING */}
                  <td>
                    <div style={actionStyle}>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(room)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(room.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No rooms found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showDialog && (
        <div
          className="modal-overlay"
          onClick={() => setShowDialog(false)}
        >
          <div
            className="modal colorful-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>
              {isEdit ? "✏️ Update Room" : "🏠 Add Room"}
            </h2>

            <input
              placeholder="Room Number"
              value={roomData.roomNumber}
              onChange={(e) =>
                setRoomData({
                  ...roomData,
                  roomNumber: e.target.value,
                })
              }
            />

            <select
              value={roomData.roomType}
              onChange={(e) =>
                setRoomData({
                  ...roomData,
                  roomType: e.target.value,
                })
              }
            >
              <option value="">Select Room Type</option>
              <option value="STANDARD">STANDARD</option>
              <option value="DELUXE">DELUXE</option>
              <option value="SUITE">SUITE</option>
            </select>

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
            />

            <select
              value={roomData.status}
              onChange={(e) =>
                setRoomData({
                  ...roomData,
                  status: e.target.value,
                })
              }
            >
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="BOOKED">BOOKED</option>
              <option value="MAINTENANCE">MAINTENANCE</option>
            </select>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>

              <button className="btn-save" onClick={handleSave}>
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================
   STYLES
========================= */

const topBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  minWidth: "180px",
};

const actionStyle = {
  display: "flex",
  gap: "8px",
  justifyContent: "center",
};

export { AdminRooms };