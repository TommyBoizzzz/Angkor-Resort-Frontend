import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../asset/logo.png";
import "./css/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginUser({ email, password });

      const response = result?.data || result;

      if (response?.success) {
        const user = response.user;

        if (!user) {
          setError("Invalid user data from server");
          return;
        }

        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.dateOfBirth,
        };

        localStorage.setItem("user", JSON.stringify(userData));

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(response?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <div className="login-card">

          <div className="logo-section">

        <div className="brand-row">
    <img
      src={logo}
      alt="Angkor Resort"
      className="resort-logo"
    />

    <h1>Angkor Resort</h1>
  </div>

  <p className="portal-text">Client Portal</p>

</div>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleLogin} className="form">
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
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="bottom-text">
            <span>Don't have an account?</span>
            <Link to="/register">Create Account</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;