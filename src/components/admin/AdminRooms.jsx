function AdminRooms() {
  return (
    <>
      <h1 className="db-title">
        Rooms
      </h1>

      <div className="db-table-box">
        <table className="db-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>101</td>
              <td>Suite</td>
              <td>$120</td>
              <td>Booked</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export { AdminRooms };