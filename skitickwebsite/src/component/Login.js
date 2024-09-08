import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const validatPass = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationError = validatPass(password);
    if (validationError) {
      setError(validationError);
    } else {
      setError("");
      console.log("Username:", username);
      console.log("Password:", password);
      navigate("/dashboard");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error}
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
