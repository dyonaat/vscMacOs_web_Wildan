import { useState } from "react";

export default function Login() {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (loading) return;
    setLoading(true);
    // play a brief animation then hide
    setTimeout(() => {
      setVisible(false);
    }, 600);
  };

  if (!visible) return null;

  return (
    <div className={`login-overlay ${loading ? "login-exit" : ""}`}>
      <div className="login-card">
        <h1 className="login-title">Welcome</h1>
        <p className="login-sub">Click login to enter the portfolio</p>

        <button
          className={`login-btn ${loading ? "loading" : ""}`}
          onClick={handleLogin}
          aria-label="Login"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
