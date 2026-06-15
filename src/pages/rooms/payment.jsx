import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

import { makePayment } from "../../services/paymentService";
import "../rooms/css/payment.css";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [method, setMethod] = useState("CARD");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // =========================
  // SAFETY CHECK (NO HEADER/FOOTER)
  // =========================
  if (!state || !state.bookingId) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <div className="payment-card">
          <h2>Invalid Payment Session</h2>
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      </main>
    );
  }

  // =========================
  // PAY NOW
  // =========================
  const handlePayNow = async () => {
    if (method === "CARD") {
      if (!cardName || !cardNumber || !expiry || !cvv) {
        alert("⚠️ Please fill all card fields");
        return;
      }

      if (cardNumber.length < 12) {
        alert("⚠️ Invalid card number");
        return;
      }

      if (cvv.length < 3) {
        alert("⚠️ Invalid CVV");
        return;
      }
    }

    try {
      setLoading(true);

      const result = await makePayment(state.bookingId, {
        paymentMethod: method,
      });

      if (result.success) {
        alert("✅ Payment Successful!");
        navigate("/");
      } else {
        alert(result.message || "Payment failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error while processing payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <SiteHeader
        user={user}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        onLogin={() => navigate("/login")}
        onRegister={() => navigate("/register")}
        onLogout={handleLogout}
      />

      {/* MAIN */}
      <main className="pt-24">
        <div className="payment-page">
          <div className="payment-card">

            <h2>Payment</h2>

            {/* SUMMARY */}
            <div className="summary">
              <p>{state.roomName}</p>

              <p style={{ fontSize: "13px", color: "gray" }}>
                {state.nights} night(s) × {state.roomCount} room(s)
              </p>

              <h1>${state.totalPrice}</h1>
            </div>

            {/* METHODS */}
            <div className="payment-methods">
              <div
                className={`method ${method === "CARD" ? "active" : ""}`}
                onClick={() => setMethod("CARD")}
              >
                💳 Credit Card
              </div>

              <div
                className={`method ${method === "KHQR" ? "active" : ""}`}
                onClick={() => setMethod("KHQR")}
              >
                📱 BAKONG KHQR
              </div>
            </div>

            {/* KHQR */}
            {method === "KHQR" && (
              <div className="khqr-box">
                <img src="/images/KHQR.png" alt="KHQR" className="khqr-img" />
                <p className="khqr-text">
                  Scan QR to pay with BAKONG KHQR
                </p>
              </div>
            )}

            {/* CARD FORM */}
            {method === "CARD" && (
              <>
                <div className="form-group">
                  <label>Card Holder Name</label>
                  <input
                    placeholder="Your Card Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>

                <div className="card-row">
                  <div className="form-group">
                    <label>Expiry</label>
                    <input
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* BUTTON */}
            <button
              className="pay-btn"
              onClick={handlePayNow}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <SiteFooter />
    </>
  );
}

export default Payment;