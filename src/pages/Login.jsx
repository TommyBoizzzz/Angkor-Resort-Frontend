import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // SIMPLE TEST LOGIN
    if (username === "admin" && password === "1234") {
      alert("Login success");
      navigate("/");
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;