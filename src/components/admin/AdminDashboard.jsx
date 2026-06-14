function AdminDashboard() {
  const cards = [
    ["Total Rooms", "120"],
    ["Guests", "350"],
    ["Bookings", "45"],
    ["Revenue", "$12,300"],
    ["Available", "30"],
    ["Rating", "4.8⭐"],
  ];

  return (
    <>
      <h1 className="db-title">
        Dashboard Overview
      </h1>

      <div className="db-card-grid">
        {cards.map(([title, value]) => (
          <div
            key={title}
            className="db-card"
          >
            <h3>{title}</h3>
            <h1>{value}</h1>
          </div>
        ))}
      </div>
    </>
  );
}

export { AdminDashboard };