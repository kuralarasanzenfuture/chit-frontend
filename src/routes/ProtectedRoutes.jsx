import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../slices/AuthSlice";

const getTokenData = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userAuth.user); // ✅ use redux
  const token = localStorage.getItem("token");

  const decoded = token ? getTokenData(token) : null;
  const isExpired = decoded ? decoded.exp * 1000 < Date.now() : true;

  useEffect(() => {
    if (!token || !decoded) {
      dispatch(logoutUser());
      return;
    }

    const expiryTime = decoded.exp * 1000;
    const timeLeft = expiryTime - Date.now();

    if (timeLeft <= 0) {
      dispatch(logoutUser());
    } else {
      const timer = setTimeout(() => {
        dispatch(logoutUser());
      }, timeLeft);

      return () => clearTimeout(timer);
    }
  }, [token, decoded, dispatch]);

  // 🔥 IMPORTANT CHANGE
  if (!user || !token || isExpired) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
