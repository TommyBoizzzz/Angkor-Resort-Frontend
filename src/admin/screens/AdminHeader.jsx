import { useState } from "react";
import { Link } from "react-router-dom";

function AdminHeader({
  sidebarVisible,
  setSidebarVisible,
}) {
  const [open, setOpen] = useState(false);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

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

        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="admin-user"
          >
            {user?.username || "Admin"}
          </button>

          {open && (
            <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border bg-white p-4 shadow-lg">

              <div className="flex flex-col gap-3">

                <div className="rounded-lg bg-neutral-100 p-4">
                  <p className="text-sm text-neutral-500">
                    Signed in as
                  </p>

                  <p className="font-semibold">
                    {user?.username || "Admin"}
                  </p>
                </div>

                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="rounded-md border px-4 py-3"
                >
                  Home
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="rounded-md border px-4 py-3"
                >
                  My Profile
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="rounded-md border px-4 py-3"
                >
                  Settings
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/";
                  }}
                  className="rounded-md bg-red-500 px-4 py-3 text-white"
                >
                  Logout
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}

export { AdminHeader };