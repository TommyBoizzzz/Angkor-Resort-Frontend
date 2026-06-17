function AdminPayments() {
  return (
    <>
      <h1 className="db-title">Payments Management</h1>

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="left-actions">
          <input
            className="search-input"
            placeholder="Search payment..."
          />

          <select className="filter-select">
            <option value="all">All Status</option>
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>

        <button className="add-btn">+ Add Payment</button>
      </div>

      {/* TABLE */}
      <div className="db-table-box">
        <table className="db-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Booking ID</th>
              <th>Method</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>BK-101</td>
              <td>Cash</td>
              <td>2026-06-10</td>
              <td>
                <span className="status paid">PAID</span>
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

export { AdminPayments };