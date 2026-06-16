import React, { useEffect, useState } from "react";
import { getBookingsByUser, cancelBooking } from "../../services/bookingService";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { useNavigate } from "react-router-dom";
import "./css/mybooking.css";

const MyBookings = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 4;

  // =========================
  // LOAD BOOKINGS
  // =========================
  const loadBookings = async () => {
    if (!userId) return;

    try {
      const data = await getBookingsByUser(userId);
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load bookings error:", err);
      setBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [userId]);

  // =========================
  // CANCEL BOOKING (FIXED)
  // =========================
  const handleCancel = async (id) => {
    const success = await cancelBooking(id);

    if (success) {
      loadBookings();
      setPage(1); // reset pagination
    }
  };

  // =========================
  // FILTER CONFIRMED
  // =========================
  const confirmedBookings = bookings.filter(
    (b) => b.bookingStatus === "CONFIRMED"
  );

  const totalPages = Math.ceil(confirmedBookings.length / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const currentItems = confirmedBookings.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      <SiteHeader user={user} />

      <main className="pt-24">
        <div className="my-bookings-page">

          <div className="payment-card">

            <button className="back-btn" onClick={() => navigate("/")}>
              ← Back to Home
            </button>

            <h2 className="my-bookings-title">
              My Confirmed Bookings
            </h2>

            <div className="bookings-scroll">
              {currentItems.length === 0 ? (
                <p className="empty-box">No confirmed bookings found</p>
              ) : (
                currentItems.map((b) => (
                  <div className="booking-card" key={b.id}>
                    <div className="card-header">
                      <h3>
                        Room {b.room?.roomNumber || "N/A"}
                      </h3>

                      <span className="status">
                        {b.bookingStatus}
                      </span>
                    </div>

                    <div className="card-body">
                      <p><b>ID:</b> {b.id}</p>
                      <p><b>Check In:</b> {b.checkInDate}</p>
                      <p><b>Check Out:</b> {b.checkOutDate}</p>
                      <p><b>Total:</b> ${b.totalPrice}</p>
                    </div>

                    <div className="card-footer">
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(b.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* PAGINATION */}
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={page === i + 1 ? "active" : ""}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>

          </div>

        </div>
      </main>

      <SiteFooter />
    </>
  );
};

export default MyBookings;