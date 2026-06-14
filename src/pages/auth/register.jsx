
import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../asset/logo.png";
import "./css/register.css";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and Password are required");
      setLoading(false);
      return;
    }

    try {
      const result = await registerUser({ email, password });

      const response = result?.data || result;

      if (response?.success) {
        alert("Register successful 🎉");
        navigate("/login");
      } else {
        setError(response?.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="overlay">
        <div className="register-card">

          <div className="logo-section">
            <img
              src={logo}
              alt="Angkor Resort"
              className="resort-logo"
            />

            <h1>Angkor Resort</h1>

            <p className="portal-text">
              CREATE YOUR ACCOUNT
            </p>
          </div>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleRegister} className="form">

            <div className="input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Register"}
            </button>

          </form>

          <p className="bottom-text">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
