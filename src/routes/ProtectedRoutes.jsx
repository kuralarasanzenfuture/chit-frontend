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

  const user = useSelector((state) => state.userAuth?.user);
  const token = localStorage.getItem("token");

  const decoded = token ? getTokenData(token) : null;

  useEffect(() => {
    // ❌ Only logout if token is invalid (not expired)
    if (!token || !decoded) {
      dispatch(logoutUser());
    }
  }, [token, decoded, dispatch]);

  // ✅ DO NOT check expiry here
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
