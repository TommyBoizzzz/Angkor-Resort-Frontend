import { useLocation } from "react-router-dom";
import "../booking/css/payment.css";

function Payment() {
  const { state } = useLocation();

  return (
    <div className="payment-page">
      <div className="payment-card">

        <h2>Payment</h2>

        <div className="summary">
          <p>{state?.roomName}</p>
          <h1>${state?.totalPrice}</h1>
        </div>

        <div className="payment-methods">

          <div className="method active">
            💳 Credit Card
          </div>

          <div className="method">
            📱 ABA KHQR
          </div>

          <div className="method">
            🏦 Bank Transfer
          </div>

        </div>

        <div className="form-group">
          <label>Card Holder Name</label>
          <input placeholder="John Doe" />
        </div>

        <div className="form-group">
          <label>Card Number</label>
          <input placeholder="1234 5678 9012 3456" />
        </div>

        <div className="card-row">

          <div className="form-group">
            <label>Expiry</label>
            <input placeholder="MM/YY" />
          </div>

          <div className="form-group">
            <label>CVV</label>
            <input placeholder="123" />
          </div>

        </div>

        <button className="pay-btn">
          Pay Now
        </button>

      </div>
    </div>
  );
}

export default Payment;