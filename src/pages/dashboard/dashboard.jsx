import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";  
import "./css/dashboard.css";
import logo from "../../asset/logo.png";

function Dashboard() {
  const navigate = useNavigate();

  const handleBooking = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/booking");
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
          <li onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}>
            Home
          </li>

          <li onClick={() => document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" })}>
            Rooms
          </li>

          <li onClick={() => document.getElementById("facilities")?.scrollIntoView({ behavior: "smooth" })}>
            Facilities
          </li>

          <li onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            About
          </li>

          <li onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Contact
          </li>
        </ul>

        <div className="auth-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
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
      <section className="about">
        <h2>Welcome to Angkor Resort</h2>
        <p>
          Experience comfort, luxury, and Khmer hospitality in our exclusive resort
          located in Siem Reap, just minutes away from Angkor Wat.
        </p>
      </section>

      {/* Rooms */}
      <section className="rooms" id="rooms">
        <h2>Our Rooms</h2>

        <div className="room-grid">

          {/* ROOM 1 */}
          <div className="room-card">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
              alt="Standard Room"
            />

            <div className="room-info">
              <h3>Standard Room</h3>
              <p>Comfortable stay for couples or solo travelers</p>
              <h4>$80 / Night</h4>

              <div className="room-actions">
                <button className="view-btn">View Details</button>
                <button onClick={handleBooking}>Book Now</button>
              </div>
            </div>
          </div>

          {/* ROOM 2 */}
          <div className="room-card">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
              alt="Deluxe Room"
            />

            <div className="room-info">
              <h3>Deluxe Room</h3>
              <p>Spacious room with garden view</p>
              <h4>$120 / Night</h4>

              <div className="room-actions">
                <button className="view-btn">View Details</button>
                <button onClick={handleBooking}>Book Now</button>
              </div>
            </div>
          </div>

          {/* ROOM 3 */}
          <div className="room-card">
            <img
              src="https://images.unsplash.com/photo-1560448075-bb485b067938"
              alt="Suite Room"
            />

            <div className="room-info">
              <h3>Suite</h3>
              <p>Luxury suite with premium facilities</p>
              <h4>$180 / Night</h4>

              <div className="room-actions">
                <button className="view-btn">View Details</button>
                <button onClick={handleBooking}>Book Now</button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Facilities */}
      <section className="facilities" id="facilities">
        <h2>Facilities</h2>

        <ul>
          <li>Swimming Pool</li>
          <li>Restaurant & Bar</li>
          <li>Spa & Massage</li>
          <li>Free WiFi</li>
          <li>Airport Pickup</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h3>Angkor Resort</h3>
        <p>Luxury stay in Siem Reap, Cambodia</p>

        <p>© 2026 Angkor Resort. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default Dashboard;