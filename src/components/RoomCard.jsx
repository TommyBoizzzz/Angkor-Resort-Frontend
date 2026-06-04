import { Link } from "react-router-dom";

function RoomCard({ room }) {
  return (
    <div className="card">
      <h3>Room {room.roomNumber}</h3>

      <p>{room.roomType}</p>

      <p>${room.price}</p>

      <Link to={`/room/${room.id}`}>
        <button>
          View Details
        </button>
      </Link>
    </div>
  );
}

export default RoomCard;