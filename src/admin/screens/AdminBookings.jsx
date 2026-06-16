function AdminBookings() {
  return (
    <>
      <h1 className="db-title">Bookings Management</h1>

      {/* FILTER BAR */}
      <div className="top-bar">
        <div className="left-actions">
          <input className="search-input" placeholder="Search booking..." />

          <select className="filter-select">
            <option value="all">All Status</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>

        <button className="add-btn">+ Add Booking</button>
      </div>

      {/* TABLE */}
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
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>R101</td>
              <td>2026-06-01</td>
              <td>2026-06-05</td>
              <td>
                <span className="status pending">PENDING</span>
              </td>
              <td>$120</td>
              <td style={actionStyle}>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>

            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No dynamic data connected yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

const actionStyle = {
  display: "flex",
  gap: "8px",
  justifyContent: "center",
};

export { AdminBookings };