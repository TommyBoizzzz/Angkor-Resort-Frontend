import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../asset/logo.png";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Rooms", id: "rooms" },
  { label: "Facilities", id: "facilities" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export function SiteHeader({
  user,
  showProfile,
  setShowProfile,
  onLogin,
  onRegister,
  onLogout,
}) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white text-black shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-4"
        >
          <img
            src={logo}
            alt="Angkor Resort"
            className="h-16 w-auto object-contain"
          />

          <span className="text-3xl font-bold text-black">
            Angkor Resort
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-black transition hover:text-neutral-600"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Auth */}
        {!user ? (
          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={onLogin}
              className="text-black hover:text-neutral-600"
            >
              Login
            </button>

            <button
              onClick={onRegister}
              className="rounded-md bg-black px-4 py-2 text-white transition hover:bg-neutral-800"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="relative hidden lg:block">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="rounded-md bg-black px-4 py-2 text-white"
            >
              {user.username || "User"}
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 flex w-52 flex-col rounded-lg border bg-white p-3 shadow-lg">
                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className="rounded px-3 py-2 hover:bg-neutral-100"
                  >
                    Go to Admin
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="rounded px-3 py-2 hover:bg-neutral-100"
                >
                  My Profile
                </Link>

                <Link
                  to="/mybooking"
                  className="rounded px-3 py-2 hover:bg-neutral-100"
                >
                  My Bookings
                </Link>

                <Link
                  to="/settings"
                  className="rounded px-3 py-2 hover:bg-neutral-100"
                >
                  Settings
                </Link>

                <button
                  onClick={onLogout}
                  className="rounded px-3 py-2 text-left text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-black lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-white px-6 py-6 text-black lg:hidden">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="py-3 text-left font-medium hover:text-neutral-600"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-6 border-t pt-6">
            {!user ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    onLogin();
                    setOpen(false);
                  }}
                  className="rounded-md border border-neutral-300 px-4 py-3"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    onRegister();
                    setOpen(false);
                  }}
                  className="rounded-md bg-black px-4 py-3 text-white"
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="rounded-lg bg-neutral-100 p-4">
                  <p className="text-sm text-neutral-500">
                    Signed in as
                  </p>

                  <p className="font-semibold">
                    {user.username}
                  </p>
                </div>

                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="rounded-md border px-4 py-3"
                  >
                    Go to Admin
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="rounded-md border px-4 py-3"
                >
                  My Profile
                </Link>

                <Link
                  to="/mybooking"
                  onClick={() => setOpen(false)}
                  className="rounded-md border px-4 py-3"
                >
                  My Bookings
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
                    onLogout();
                    setOpen(false);
                  }}
                  className="rounded-md bg-red-500 px-4 py-3 text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
