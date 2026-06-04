import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <h2>🏨 HotelBook</h2>
      </Link>

      <Link to="/login">
        <button className="btn">
          Login
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;