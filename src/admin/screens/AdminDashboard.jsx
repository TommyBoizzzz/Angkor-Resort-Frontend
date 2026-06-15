import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    guests: 0,
    bookings: 0,
    revenue: 0,
    available: 0,
    rating: 4.8,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  // =========================
  // LOAD DASHBOARD DATA
  // =========================
  const loadDashboard = async () => {
    try {
      // 🔥 TEMP STATIC DATA (replace with API later)
      const data = {
        totalRooms: 20,
        guests: 5,
        bookings: 1,
        revenue: 1111,
        available: 30,
        rating: 4.8,
      };

      setStats(data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CARDS CONFIG
  // =========================
  const cards = [
    { title: "Total Rooms", value: stats.totalRooms },
    { title: "Guests", value: stats.guests },
    { title: "Bookings", value: stats.bookings },
    { title: "Revenue", value: `$${stats.revenue.toLocaleString()}` },
    { title: "Available", value: stats.available },
    { title: "Rating", value: `${stats.rating} ⭐` },
  ];

  return (
    <>
      <h1 className="db-title">Dashboard Overview</h1>

      {loading ? (
        <p style={{ padding: "20px" }}>Loading dashboard...</p>
      ) : (
        <div className="db-card-grid">
          {cards.map((card) => (
            <div key={card.title} className="db-card">
              <h3>{card.title}</h3>
              <h1>{card.value}</h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export { AdminDashboard };