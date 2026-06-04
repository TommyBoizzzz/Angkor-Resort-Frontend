import { useParams } from "react-router-dom";

function Booking() {
  const { id } = useParams();

  return (
    <div className="booking">

      <h1>Booking Room</h1>

      <p>Room ID: {id}</p>

      <form>

        <input
          placeholder="Full Name"
        />

        <input
          placeholder="Email"
        />

        <input type="date" />

        <input type="date" />

        <button className="btn">
          Confirm Booking
        </button>

      </form>

    </div>
  );
}

export default Booking;