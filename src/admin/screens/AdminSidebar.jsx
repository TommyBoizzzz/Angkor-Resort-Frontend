const menus = [
  ["dashboard", "📊 Dashboard"],
  ["rooms", "🛏 Rooms"],
  ["guests", "👤 Guests"],
  ["bookings", "📅 Bookings"],
  ["payments", "💳 Payments"],
  ["reviews", "⭐ Reviews"],
];

function AdminSidebar({
  sidebarVisible,
  page,
  setPage,
  handleLogout,
}) {
  return (
    <aside
      className={
        sidebarVisible
          ? "admin-sidebar sidebar-open"
          : "admin-sidebar"
      }
    >
      <div className="admin-sidebar-content">
        {menus.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setPage(key)}
            className={
              page === key
                ? "admin-menu active"
                : "admin-menu"
            }
          >
            {label}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="admin-menu"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}

export { AdminSidebar };