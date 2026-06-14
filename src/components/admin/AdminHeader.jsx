function AdminHeader({
  sidebarVisible,
  setSidebarVisible,
}) {
  return (
    <header className="admin-header">

      <div className="admin-header-inner">

        <div className="admin-header-left">

          <button
            onClick={() =>
              setSidebarVisible(!sidebarVisible)
            }
            className="admin-menu-btn"
          >
            ☰
          </button>

          <h2 className="admin-title">
            Angkor Resort
          </h2>

        </div>

        <div className="admin-user">
          Admin
        </div>

      </div>

    </header>
  );
}

export { AdminHeader };