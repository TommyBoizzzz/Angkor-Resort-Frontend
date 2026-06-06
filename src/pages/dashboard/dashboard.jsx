import { useNavigate } from "react-router-dom";
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
          <li>Home</li>
          <li>Hotels</li>
          <li>Destinations</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <div className="auth-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Find Your Perfect Stay</h1>

          <p>
            Search thousands of hotels, resorts, villas, and apartments around
            the world.
          </p>

          <div className="search-box">
            <input type="text" placeholder="Destination" />
            <input type="date" />
            <input type="date" />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="destinations">
        <h2>Popular Destinations</h2>

        <div className="destination-grid">
          <div className="destination-card">
            <img
              src="https://images.unsplash.com/photo-1528127269322-539801943592"
              alt=""
            />
            <h3>Siem Reap</h3>
          </div>

          <div className="destination-card">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt=""
            />
            <h3>Sihanoukville</h3>
          </div>

          <div className="destination-card">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              alt=""
            />
            <h3>Mondulkiri</h3>
          </div>

          <div className="destination-card">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
              alt=""
            />
            <h3>Phnom Penh</h3>
          </div>
        </div>
      </section>

      {/* Hotels */}
      <section className="featured">
        <h2>Featured Hotels</h2>

        <div className="hotel-grid">
          <div className="hotel-card">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
              alt=""
            />

            <div className="hotel-info">
              <h3>Luxury Resort</h3>
              <p>Siem Reap</p>
              <p>⭐⭐⭐⭐⭐</p>
              <h4>$120 / Night</h4>

              <button onClick={handleBooking}>Book Now</button>
            </div>
          </div>

          <div className="hotel-card">
            <img
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
              alt=""
            />

            <div className="hotel-info">
              <h3>Beach Paradise</h3>
              <p>Sihanoukville</p>
              <p>⭐⭐⭐⭐⭐</p>
              <h4>$180 / Night</h4>

              <button onClick={handleBooking}>Book Now</button>
            </div>
          </div>

          <div className="hotel-card">
            <img
              src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c"
              alt=""
            />

            <div className="hotel-info">
              <h3>Mountain View</h3>
              <p>Mondulkiri</p>
              <p>⭐⭐⭐⭐</p>
              <h4>$90 / Night</h4>

              <button onClick={handleBooking}>Book Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Offer */}
      <section className="offer">
        <div className="offer-box">
          <h2>Special Summer Offer</h2>
          <p>Get up to 30% OFF on selected luxury hotels.</p>
          <button>Explore Deals</button>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews">
        <h2>What Our Guests Say</h2>

        <div className="review-grid">
          <div className="review-card">
            <p>
              Amazing experience. Easy booking process and great hotels.
            </p>
            <h4>John Doe</h4>
          </div>

          <div className="review-card">
            <p>
              Best hotel booking website I have used. Highly recommended.
            </p>
            <h4>Sarah Smith</h4>
          </div>

          <div className="review-card">
            <p>
              Beautiful resorts and excellent customer support.
            </p>
            <h4>Michael Lee</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h3>StayBook</h3>
        <p>Find your perfect stay anywhere in the world.</p>

        <div className="footer-links">
          <span>About</span>
          <span>Contact</span>
          <span>Privacy Policy</span>
          <span>Terms</span>
        </div>

        <p>© 2025 StayBook. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;