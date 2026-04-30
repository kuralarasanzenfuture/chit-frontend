import { createSlice } from "@reduxjs/toolkit";

/* ================= HELPER: Parse JWT ================= */
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Invalid token");
    return null;
  }
};

/* ================= GET STORED USER ================= */
const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user && user !== "undefined" ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

/* ================= INITIAL STATE ================= */
const initialState = {
  user: getStoredUser(),
  loading: false,
  error: null,
};

/* ================= SLICE ================= */
export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    /* ===== LOGIN SUCCESS ===== */
    loginUser: (state, action) => {
      const data = action.payload;

      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      // ✅ Decode user info from token
      const decodedUser = parseJwt(accessToken);

      state.user = decodedUser;
      state.loading = false;
      state.error = null;

      // ✅ Store in localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(decodedUser));
    },

    /* ===== LOADING ===== */
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    /* ===== ERROR ===== */
    setErrors: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    /* ===== LOGOUT ===== */
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

/* ================= EXPORTS ================= */
export const { loginUser, logoutUser, setErrors, setLoading } = AuthSlice.actions;
export default AuthSlice.reducer;
