import { useState } from "react";
import { BookOpen } from "lucide-react";
import "../styles/LogIn.css";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const { email, setEmail, password, setPassword, login, error, setError, setUser } = useAuth()
  const navigate = useNavigate()
  const handleLogin = async () => {
    const data = await login(email, password)
    setUser(data.user.id)
    if (data) navigate("/")
    else setError(error)
    };

  return (
    <div className="login-page">
      <div className="login-wrap">
        <div className="login-header">
          <div className="login-icon">
            <BookOpen size={28} />
          </div>

          <h1 className="login-title">Study Tracker</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="field">
              <label>Email address</label>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="row-between">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              {/* <a href="#" className="link">
                Forgot password?
              </a> */}
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" disabled={loading} className="login-btn" >onClick={handleLogin}Log In</button>
          </form>

          {/* <p className="signup-text">
            Don&apos;t have an account? <a href="#" className="link">Sign up</a>
          </p> */}
        </div>
      </div>
    </div>
  );
}
