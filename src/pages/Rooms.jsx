import { useEffect, useState } from "react";
import { getRooms, addRoom, deleteRoom } from "../services/roomService";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    price: "",
    status: "",
  });

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const response = await getRooms();
      setRooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addRoom(formData);

      setFormData({
        roomNumber: "",
        roomType: "",
        price: "",
        status: "",
      });

      loadRooms();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);
      loadRooms();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

      <h2>Room Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={formData.roomNumber}
          onChange={handleChange}
        />

        <input
          type="text"
          name="roomType"
          placeholder="Room Type"
          value={formData.roomType}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
        />

        <button type="submit">
          Add Room
        </button>
      </form>

      <hr />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Room No</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>${room.price}</td>
              <td>{room.status}</td>

              <td>
                <button
                  onClick={() => handleDelete(room.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Rooms;