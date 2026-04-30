import { useEffect, useState } from "react";
import "./Login.css";
import { loginUser, setErrors, setLoading } from "../slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

 useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading());
    try {
      const res = await api.post("/auth/login", { login, password });
      dispatch(loginUser(res.data));
      toast.success("Login Successfully");
      navigate("/dashboard");
      setLogin("");
      setPassword("");
    } catch (error) {
      const err = error?.response?.data?.message || error.message || "Login Failed";
      dispatch(setErrors(err));
      toast.error(err);
    }
  };

  return (
    <>
      {/* Bootstrap container */}
      <div className="outer-card">
        {/* Background decorative circles */}
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
        <div className="bg-circle bg-circle-3" />

        <div className="row align-items-center justify-content-center h-100 gx-0">
          {/* ── LEFT: Welcome ── */}
          <div className="col-12 col-md-6 ps-5 py-5 pe-3" style={{ position: "relative", zIndex: 2 }}>
            <div className="welcome-title ">Welcome</div>
            <div className="welcome-subtitle ">Manage your chit groups smarter.</div>
            <p className="welcome-desc mb-0">
              Track payments, late fees, and overdue customers — all in one place. Trusted by 500+ chit fund operators.
            </p>
          </div>

          {/* ── RIGHT: Sign-in floating card ── */}
          <div className="col-12 col-md-4 py-4 pe-4 ps-2">
            <div className="signin-card">
              {/* Title */}
              <div className="signin-title mb-1">Welcome back 👋</div>
              <p className="signin-subtitle mb-4">Sign in to your account</p>

              <form onSubmit={handleLogin}>
                <div className="login_form_group">
                  <label className="login_label">Username / Email</label>
                  <div className="login_input_wrap">
                    <i className="bi bi-envelope login_input_icon" />
                    <input
                      className="login_input"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      type="text"
                      placeholder="Enter phone or email"
                      required
                    />
                  </div>
                </div>

                <div className="login_form_group">
                  <label className="login_label">Password</label>
                  <div className="login_input_wrap">
                    <i className="bi bi-lock login_input_icon" />
                    <input
                      className="login_input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                    />
                    <button type="button" className="login_pw_toggle" onClick={() => setShowPassword(!showPassword)}>
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                    </button>
                  </div>
                </div>

                {/* <div className="login_row_between">
                  <label className="login_remember">
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#" className="login_forgot">
                    Forgot password?
                  </a>
                </div> */}

                <button type="submit" className="btn main-btn">
                  Sign in to Dashboard
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
