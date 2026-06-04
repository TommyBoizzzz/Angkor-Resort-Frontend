import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function RoomDetail() {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRoom();
  }, [id]);

  const loadRoom = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/rooms/${id}`
      );

      setRoom(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Room not found or server error.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "50px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "50px" }}>
        <h2>{error}</h2>

        <Link to="/">
          <button>Back Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "50px" }}>
      <Link to="/">
        <button>← Back</button>
      </Link>

      <h1>Room {room.roomNumber}</h1>

      <hr />

      <p>
        <strong>ID:</strong> {room.id}
      </p>

      <p>
        <strong>Room Number:</strong> {room.roomNumber}
      </p>

      <p>
        <strong>Room Type:</strong> {room.roomType}
      </p>

      <p>
        <strong>Status:</strong> {room.status}
      </p>

      <p>
        <strong>Price:</strong> ${room.price}
      </p>

      <br />

      <Link to={`/booking/${room.id}`}>
        <button>Book Now</button>
      </Link>
    </div>
  );
}

export default RoomDetail;