function AdminHeader({
  sidebarVisible,
  setSidebarVisible,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="admin-header">

      <div className="admin-header-inner">

        <div className="admin-header-left">

          <button
            onClick={() => setSidebarVisible(!sidebarVisible)}
            className="admin-menu-btn"
          >
            ☰
          </button>

          <h2 className="admin-title">
            Angkor Resort
          </h2>

        </div>

        <div className="admin-user">
          {user?.username || "Admin"}
        </div>

      </div>

    </header>
  );
}

export { AdminHeader };