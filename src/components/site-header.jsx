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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white text-black shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
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

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium text-black hover:text-neutral-600"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {!user ? (
          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={onLogin} className="text-black">
              Login
            </button>

            <button
              onClick={onRegister}
              className="rounded-md bg-black px-4 py-2 text-white"
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
              <div className="absolute right-0 mt-3 flex w-44 flex-col gap-2 rounded-md bg-white p-3 text-black shadow-lg">
                {user?.role === "ADMIN" && (
                  <Link to="/admin">Go to Admin</Link>
                )}
                <Link to="/profile">My Profile</Link>
                <Link to="/my-bookings">My Bookings</Link>
                <Link to="/settings">Settings</Link>
                <button onClick={onLogout} className="text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="text-black lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="bg-white px-6 py-6 text-black lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full py-3 text-left text-black"
            >
              {item.label}
            </button>
          ))}

          {!user ? (
            <div className="mt-4 flex gap-3">
              <button onClick={onLogin} className="text-black">
                Login
              </button>
              <button
                onClick={onRegister}
                className="rounded-md bg-black px-4 py-2 text-white"
              >
                Register
              </button>
            </div>
          ) : (
            <button onClick={onLogout} className="mt-4 text-black">
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}