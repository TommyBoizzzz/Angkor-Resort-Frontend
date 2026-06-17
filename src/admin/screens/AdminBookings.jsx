import { useEffect, useState } from "react";
import {
  getAllBookings,
  cancelBooking,
  updateBooking,
  deleteBooking,
} from "../Service/BookingService";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Edit State
  const [editBooking, setEditBooking] = useState(null);
  const [form, setForm] = useState({
    checkInDate: "",
    checkOutDate: "",
    bookingStatus: "PENDING",
  });

  // =========================
  // LOAD BOOKINGS
  // =========================
  const loadBookings = async () => {
    setLoading(true);

    try {
      const data = await getAllBookings();
      setBookings(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // =========================
  // CANCEL
  // =========================
  const handleCancel = async (id) => {
    const ok = await cancelBooking(id);

    if (ok) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                bookingStatus: "CANCELLED",
              }
            : b
        )
      );
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    await deleteBooking(id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // =========================
  // OPEN EDIT
  // =========================
  const handleEdit = (booking) => {
    setEditBooking(booking);

    setForm({
      checkInDate: booking.checkInDate || "",
      checkOutDate: booking.checkOutDate || "",
      bookingStatus: booking.bookingStatus || "PENDING",
    });
  };

  // =========================
  // UPDATE
  // =========================
  const handleUpdate = async () => {
    try {
      await updateBooking(editBooking.id, form);

      await loadBookings();

      setEditBooking(null);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredBookings = bookings.filter((b) => {
    const matchSearch =
      b.id?.toString().includes(search) ||
      b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.room?.roomNumber?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" ||
      b.bookingStatus === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <>
      <h1 className="db-title">Bookings Management</h1>

      {/* Top Bar */}
      <div className="top-bar">
        <div className="left-actions">
          <input
            className="search-input"
            placeholder="Search booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="all">All Status</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>

        <button className="add-btn">
          + Add Booking
        </button>
      </div>

      {/* Table */}
      <div className="db-table-box">
        <table className="db-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Room</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center" }}
                >
                  Loading...
                </td>
              </tr>
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>

                  <td>{b.user?.name}</td>

                  <td>{b.room?.roomNumber}</td>

                  <td>{b.checkInDate}</td>

                  <td>{b.checkOutDate}</td>

                  <td>
                    <span
                      className={`status ${b.bookingStatus?.toLowerCase()}`}
                    >
                      {b.bookingStatus}
                    </span>
                  </td>

                  <td>${b.totalPrice}</td>

                  <td style={actionStyle}>
                    <button
                      onClick={() => handleEdit(b)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleCancel(b.id)
                      }
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(b.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{ textAlign: "center" }}
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =========================
            EDIT MODAL
      ========================= */}

      {editBooking && (
        <div
          className="modal-overlay"
          onClick={() => setEditBooking(null)}
        >
          <div
            className="modal colorful-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Edit Booking
            </h2>

            <input
              type="date"
              value={form.checkInDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  checkInDate: e.target.value,
                })
              }
            />

            <input
              type="date"
              value={form.checkOutDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  checkOutDate: e.target.value,
                })
              }
            />

            <select
              value={form.bookingStatus}
              onChange={(e) =>
                setForm({
                  ...form,
                  bookingStatus: e.target.value,
                })
              }
            >
              <option value="PENDING">
                PENDING
              </option>

              <option value="APPROVED">
                APPROVED
              </option>

              <option value="CONFIRMED">
                CONFIRMED
              </option>

              <option value="CANCELLED">
                CANCELLED
              </option>
            </select>

            <div className="modal-actions">
              <button
                className="btn-save"
                onClick={handleUpdate}
              >
                Save Changes
              </button>

              <button
                className="btn-cancel"
                onClick={() =>
                  setEditBooking(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const actionStyle = {
  display: "flex",
  gap: "8px",
  justifyContent: "center",
};

export { AdminBookings };