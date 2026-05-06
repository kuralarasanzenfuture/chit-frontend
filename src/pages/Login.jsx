import { useEffect, useState } from "react";
import "./Login.css";
import logo from "../assets/images/logo.webp"; // ← place logo.webp in src/assets/
import { loginUser, setErrors, setLoading } from "../slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.userAuth.loading);
  const errs = useSelector((state) => state.userAuth.error);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard", { replace: true });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      const res = await api.post("/auth/login", { login, password });
      dispatch(loginUser(res.data));
      navigate("/dashboard");
      setLogin("");
      setPassword("");
    } catch (error) {
      const err = error?.response?.data?.message || error.message || "Login Failed";
      dispatch(setErrors(err));
    }
  };

  return (
    <div className="space-login-root">
      {/* ── Starfield layers ── */}
      <div className="stars-layer stars-sm" />
      <div className="stars-layer stars-md" />
      <div className="stars-layer stars-lg" />

      {/* ── Shooting comets ── */}
      <div className="comet comet-1" />
      <div className="comet comet-2" />
      <div className="comet comet-3" />

      {/* ── Planets ── */}
      <div className="planet planet-blue">
        <div className="planet-ring" />
        <div className="planet-surface" />
      </div>
      <div className="planet planet-mid" />
      <div className="planet planet-small" />

      {/* ── Logo — top-left ── */}
      <div className="space-logo">
        <img src={logo} alt="ZenFuture" className="space-logo-img" />
      </div>

      {/* ── Bottom-left tagline ── */}
      <div className="space-tagline">
        <div className="tagline-line1">SIGN IN TO YOUR</div>
        <div className="tagline-line2">DASHBOARD!</div>
      </div>

      {/* ── Right: Form panel ── */}
      <div className="space-form-panel">
        <h1 className="space-form-title">SIGN IN</h1>
        <p className="space-form-subtitle">Sign in with your credentials</p>

        <form onSubmit={handleLogin} className="space-form" noValidate>
          {/* Username / Email */}
          <div className="space-field">
            <div className="space-input-wrap">
              <span className="space-input-icon">
                <i className="bi bi-person" />
              </span>
              <input
                className="space-input"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                type="text"
                placeholder="Username or Email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-field">
            <div className="space-input-wrap">
              <span className="space-input-icon">
                <i className="bi bi-lock" />
              </span>
              <input
                className="space-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <button type="button" className="space-pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
              </button>
            </div>
          </div>
          {errs && <small className="text-danger">{errs}</small>}
          <button type="submit" className="space-submit-btn">
            <span>{loading ? "Signing" : "Sign in to Dashboard"}</span>
          </button>
        </form>

        <div className="space-divider">
          <span className="divider-line" />
          <span className="divider-text">Manage your chit groups smarter</span>
          <span className="divider-line" />
        </div>

        <p className="space-terms">
          By signing in you agree to our{" "}
          <a href="#" className="space-terms-link">
            Terms and Conditions
          </a>
        </p>
      </div>
    </div>
  );
};