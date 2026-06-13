import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../booking/css/booking.css";

function Booking() {
  const navigate = useNavigate();

  const roomPrice = 80;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const days = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    return days > 0 ? days * roomPrice : 0;
  };

  const totalPrice = calculateTotal();

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h2>Book Your Stay</h2>

        <div className="room-info">
          <h3>Deluxe Room</h3>
          <p>$80 / Night</p>
        </div>

        <div className="date-row">
          <div className="form-group">
            <label>Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Check Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="price-box">
          <span>Total Price</span>
          <h1>${totalPrice}</h1>
        </div>

        <button
          className="book-btn"
          onClick={() =>
            navigate("/payment", {
              state: {
                totalPrice,
                roomName: "Deluxe Room",
              },
            })
          }
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

export default Booking;