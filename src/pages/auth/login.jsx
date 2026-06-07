import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
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

      console.log("LOGIN RESPONSE:", result);

      // ✅ FIX: handle different backend structures safely
      const response = result?.data || result;

      if (response?.success) {
        const user = response.user;

        if (!user) {
          setError("Invalid user data from server");
          return;
        }

        // ✅ store only needed data (better security)
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.dateOfBirth
        };

        localStorage.setItem("user", JSON.stringify(userData));

        // ✅ redirect based on role
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
      <div className="login-card">

        <h2 className="title">🏨 Angkor Resort</h2>
        <p className="subtitle">Login to your account</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin} className="form">

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;