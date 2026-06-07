import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./css/dashboard.css";
import logo from "../../asset/logo.png";

function Dashboard() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  // ✅ FIXED: safe user parsing (ONLY ONCE)
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/booking");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo-section">
          <img src={logo} alt="Angkor Resort" />
          <span>Angkor Resort</span>
        </div>

        <ul className="nav-links">
          <li onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}>Home</li>
          <li onClick={() => document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" })}>Rooms</li>
          <li onClick={() => document.getElementById("facilities")?.scrollIntoView({ behavior: "smooth" })}>Facilities</li>
          <li onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>About</li>
          <li onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Contact</li>
        </ul>

        {/* AUTH CHECK */}
        {!user ? (
          <div className="auth-buttons">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        ) : (
          <div className="profile-container">

            <button
              className="profile-btn"
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="profile-avatar">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </div>

              <span>{user.username || "User"}</span>
            </button>

            {showProfile && (
              <div className="profile-dropdown">

                <Link to="/profile">👤 My Profile</Link>
                <Link to="/my-bookings">📖 My Bookings</Link>
                <Link to="/settings">⚙ Settings</Link>

                <button onClick={handleLogout}>
                  🚪 Logout
                </button>

              </div>
            )}

          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-overlay">
          <h1>Angkor Resort</h1>
          <p>Luxury stay experience in the heart of Siem Reap</p>

          <button className="cta-button" onClick={handleBooking}>
            Book Your Stay
          </button>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <h2>Welcome to Angkor Resort</h2>
        <p>
          Experience comfort, luxury, and Khmer hospitality in our exclusive resort located in Siem Reap.
        </p>
      </section>

      {/* Rooms */}
      <section className="rooms" id="rooms">
        <h2>Our Rooms</h2>

        <div className="room-grid">

          <div className="room-card">
            <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" alt="" />
            <h3>Standard Room</h3>
            <p>$80 / Night</p>
            <button onClick={handleBooking}>Book Now</button>
          </div>

          <div className="room-card">
            <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" alt="" />
            <h3>Deluxe Room</h3>
            <p>$120 / Night</p>
            <button onClick={handleBooking}>Book Now</button>
          </div>

          <div className="room-card">
            <img src="https://images.unsplash.com/photo-1560448075-bb485b067938" alt="" />
            <h3>Suite</h3>
            <p>$180 / Night</p>
            <button onClick={handleBooking}>Book Now</button>
          </div>

        </div>
      </section>

      {/* Facilities */}
      <section className="facilities" id="facilities">
        <h2>Facilities</h2>
        <ul>
          <li>Swimming Pool</li>
          <li>Restaurant</li>
          <li>Spa</li>
          <li>Free WiFi</li>
          <li>Airport Pickup</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <h3>Angkor Resort</h3>
        <p>Luxury stay in Siem Reap, Cambodia</p>
        <p>© 2026 Angkor Resort</p>
      </footer>

    </div>
  );
}

export default Dashboard;