import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
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

    try {
      const result = await registerUser({ email, password });

      if (result.success) {
        alert("Register success");
        navigate("/login");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="title">🏨 Angkor Resort</h2>
        <p className="subtitle">Create your account</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleRegister} className="form">

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />

          <button
            type="submit"
            className="button"
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;