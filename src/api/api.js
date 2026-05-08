
// import axios from "axios";
// import { logoutUser } from "../slices/AuthSlice";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL
//     ? `${import.meta.env.VITE_API_BASE_URL}/api`
//     : "http://localhost:8080/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /* ================= REQUEST ================= */
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");

// //     console.log("🔐 Token:", token);
// //     console.log("📤 Headers:", config.headers);
// //     if (token && !config.headers.Authorization) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     // ✅ Debug log (DEV only)
// //     if (import.meta.env.DEV) {
// //       console.log("📤 Request:", config.url, config.method);
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error),
// // );

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     console.log("🔐 Token:", token);

//     if (token && !config.headers.Authorization) {
//       config.headers.Authorization = `Bearer ${token}`;

//       /* ================= DECODE TOKEN ================= */
//       try {
//         const payload = JSON.parse(atob(token.split(".")[1]));

//         const expTime = payload.exp * 1000; // convert to ms
//         const now = Date.now();

//         console.log("🕒 Access Exp:", new Date(expTime));
//         console.log("⏳ Time Left (sec):", Math.floor((expTime - now) / 1000));

//         // 🔥 OPTIONAL: warn if about to expire
//         if (expTime - now < 60 * 1000) {
//           console.warn("⚠️ Token expiring in < 1 min");
//         }
//       } catch (e) {
//         console.warn("❌ Invalid JWT token");
//       }
//     }

//     if (import.meta.env.DEV) {
//       console.log("📤 Request:", config.url, config.method);
//     }

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// /* ================= RESPONSE ================= */
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     error ? prom.reject(error) : prom.resolve(token);
//   });
//   failedQueue = [];
// };

// // api.interceptors.response.use(
// //   (response) => {
// //     if (import.meta.env.DEV) {
// //       console.log("✅ Response:", response.config.url, response.status);
// //     }
// //     return response;
// //   },
// //   async (error) => {
// //     if (!error.response) {
// //       console.error("🚨 Network Error:", error.message);
// //       return Promise.reject(error);
// //     }

// //     const originalRequest = error.config;
// //     const status = error.response.status;

// //     // ❌ Avoid infinite loop
// //     if (originalRequest.url.includes("/auth/refresh")) {
// //       return Promise.reject(error);
// //     }

// //     if (status === 401 && !originalRequest._retry) {
// //       const refreshToken = localStorage.getItem("refreshToken");

// //       if (!refreshToken) {
// //         localStorage.clear();
// //         window.location.replace("/login");
// //         return Promise.reject(error);
// //       }

// //       if (isRefreshing) {
// //         return new Promise((resolve, reject) => {
// //           failedQueue.push({
// //             resolve: (token) => {
// //               originalRequest.headers.Authorization = `Bearer ${token}`;
// //               resolve(api(originalRequest));
// //             },
// //             reject,
// //           });
// //         });
// //       }

// //       originalRequest._retry = true;
// //       isRefreshing = true;

// //       try {
// //         const res = await axios.post(
// //           `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
// //           { refreshToken },
// //         );

// //         const newAccessToken = res.data.accessToken;

// //         localStorage.setItem("token", newAccessToken);

// //         api.defaults.headers.common["Authorization"] =
// //           `Bearer ${newAccessToken}`;

// //         processQueue(null, newAccessToken);

// //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
// //         return api(originalRequest);
// //       } catch (err) {
// //         // processQueue(err, null);
// //         // localStorage.clear();
// //         // window.location.replace("/login");
// //         // return Promise.reject(err);

// //         if (status === 302) {
// //           console.warn("⚠️ 302 Redirect detected");

// //           // 🔥 Debug redirect location
// //           console.log(
// //             "➡️ Redirect Location:",
// //             error.response.headers?.location,
// //           );

// //           // Usually session expired or auth issue
// //           localStorage.clear();
// //           window.location.replace("/login");

// //           return Promise.reject({
// //             message: "Session expired. Please login again.",
// //           });
// //         }
// //       } finally {
// //         isRefreshing = false;
// //       }
// //     }

// //     console.error("❌ API Error:", error.response?.data || error.message);

// //     console.error("❌ API Error FULL:", {
// //       status: error.response?.status,
// //       data: error.response?.data,
// //       headers: error.response?.headers,
// //     });

// //     return Promise.reject(error);
// //   },
// // );

// api.interceptors.response.use(
//   (response) => {
//     if (import.meta.env.DEV) {
//       console.log("✅ Response:", response.config.url, response.status);
//     }
//     return response;
//   },
//   async (error) => {
//     if (!error.response) {
//       console.error("🚨 Network Error:", error.message);
//       return Promise.reject(error);
//     }

//     const originalRequest = error.config;
//     const status = error.response.status;

//     console.error("❌ API Error:", status, error.response.data);

//     // ❌ Avoid infinite loop
//     if (originalRequest.url.includes("/auth/refresh")) {
//       logoutUser();
//       return Promise.reject(error);
//     }

//     /* ================= HANDLE 401 ================= */
//     if (status === 401 && !originalRequest._retry) {
//       const refreshToken = localStorage.getItem("refreshToken");

//       if (!refreshToken) {
//         logoutUser();
//         return Promise.reject(error);
//       }

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({
//             resolve: (token) => {
//               originalRequest.headers.Authorization = `Bearer ${token}`;
//               resolve(api(originalRequest));
//             },
//             reject,
//           });
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const res = await api.post("/auth/refresh", {
//           refreshToken,
//         });

//         const newAccessToken = res.data.accessToken;

//         console.log("🔄 New Access Token:", newAccessToken);

//         localStorage.setItem("token", newAccessToken);

//         api.defaults.headers.common["Authorization"] =
//           `Bearer ${newAccessToken}`;

//         processQueue(null, newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("❌ Refresh Failed:", refreshError.response?.status);

//         processQueue(refreshError, null);

//         // 🔥 IMPORTANT: Logout on refresh failure
//         logoutUser();

//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     /* ================= HANDLE 302 ================= */
//     if (status === 302) {
//       console.warn("⚠️ 302 Redirect → session expired");
//       logoutUser();
//     }

//     console.error("❌ API Error:", error.response?.data || error.message);

//     console.error("❌ API Error FULL:", {
//       status: error.response?.status,
//       data: error.response?.data,
//       headers: error.response?.headers,
//     });

//     return Promise.reject(error);
//   },
// );

// export default api;

// import axios from "axios";

// /* ================= AXIOS INSTANCE ================= */
// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /* ================= HELPERS ================= */
// const parseJwt = (token) => {
//   try {
//     return JSON.parse(atob(token.split(".")[1]));
//   } catch {
//     console.warn("❌ Invalid JWT");
//     return null;
//   }
// };

// const logoutUser = () => {
//   console.warn("🚪 LOGOUT → clearing session");
//   localStorage.clear();
//   window.location.replace("/login");
// };

// /* ================= REFRESH CONTROL ================= */
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   console.log("📦 Processing Queue:", failedQueue.length);

//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });

//   failedQueue = [];
// };

// /* ================= REQUEST INTERCEPTOR ================= */
// api.interceptors.request.use(
//   async (config) => {
//     let token = localStorage.getItem("token");
//     const refreshToken = localStorage.getItem("refreshToken");

//     console.log("\n===== REQUEST =====");
//     console.log("📤 URL:", config.url);

//     if (!token) {
//       console.warn("⚠️ No token found");
//       return config;
//     }

//     const decoded = parseJwt(token);

//     if (!decoded?.exp) {
//       console.warn("❌ Invalid token structure → logout");
//       logoutUser();
//       return config;
//     }

//     const now = Math.floor(Date.now() / 1000);
//     const timeLeft = decoded.exp - now;

//     console.log("🕒 Exp:", new Date(decoded.exp * 1000));
//     console.log("⏳ Time Left:", timeLeft);

//     /* 🔥 IF TOKEN EXPIRED → REFRESH BEFORE REQUEST */
//     if (timeLeft <= 0) {
//       console.warn("❌ Token expired BEFORE request");

//       if (!refreshToken) {
//         logoutUser();
//         return Promise.reject("No refresh token");
//       }

//       if (isRefreshing) {
//         console.log("⏳ Waiting for refresh...");

//         token = await new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         });

//         config.headers.Authorization = `Bearer ${token}`;
//         return config;
//       }

//       isRefreshing = true;

//       try {
//         console.log("🔄 Refreshing token (pre-request)");

//         const res = await axios.post(
//           `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
//           { refreshToken }
//         );

//         token = res.data.accessToken;

//         console.log("✅ New token received");

//         localStorage.setItem("token", token);

//         processQueue(null, token);

//         config.headers.Authorization = `Bearer ${token}`;

//         return config;
//       } catch (err) {
//         console.error("❌ Refresh FAILED → logout");
//         processQueue(err, null);
//         logoutUser();
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     /* ⚠️ TOKEN ABOUT TO EXPIRE */
//     if (timeLeft < 60) {
//       console.warn("⚠️ Token expiring soon (<60s)");
//     }

//     config.headers.Authorization = `Bearer ${token}`;

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* ================= RESPONSE INTERCEPTOR ================= */
// api.interceptors.response.use(
//   (response) => {
//     console.log("✅ RESPONSE:", response.config.url, response.status);
//     return response;
//   },
//   async (error) => {
//     if (!error.response) {
//       console.warn("🌐 Network error → not logging out");
//       return Promise.reject(error);
//     }

//     const originalRequest = error.config;
//     const status = error.response.status;

//     console.log("\n===== RESPONSE ERROR =====");
//     console.error("❌ Status:", status);
//     console.error("❌ URL:", originalRequest.url);
//     console.error("❌ Data:", error.response.data);

//     /* ❌ Prevent infinite loop */
//     if (originalRequest.url.includes("/auth/refresh")) {
//       console.error("❌ Refresh API failed → logout");
//       logoutUser();
//       return Promise.reject(error);
//     }

//     /* ================= HANDLE AUTH ERRORS ================= */
//     if ((status === 401 || status === 400) && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const refreshToken = localStorage.getItem("refreshToken");

//       if (!refreshToken) {
//         console.warn("❌ No refresh token → logout");
//         logoutUser();
//         return Promise.reject(error);
//       }

//       if (isRefreshing) {
//         console.log("⏳ Waiting for refresh (response)...");

//         return new Promise((resolve, reject) => {
//           failedQueue.push({
//             resolve: (token) => {
//               originalRequest.headers.Authorization = `Bearer ${token}`;
//               resolve(api(originalRequest));
//             },
//             reject,
//           });
//         });
//       }

//       isRefreshing = true;

//       try {
//         console.log("🔄 Refreshing token (response)");

//         const res = await axios.post(
//           `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
//           { refreshToken }
//         );

//         const newToken = res.data.accessToken;

//         console.log("✅ New token received (response)");

//         localStorage.setItem("token", newToken);

//         api.defaults.headers.common["Authorization"] =
//           `Bearer ${newToken}`;

//         processQueue(null, newToken);

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;

//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("❌ Refresh FAILED → logout");

//         processQueue(refreshError, null);
//         logoutUser();

//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     /* ================= FORBIDDEN ================= */
//     if (status === 403) {
//       console.warn("⛔ Forbidden → logout");
//       logoutUser();
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";

/* ================= AXIOS INSTANCE ================= */
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= LOGOUT ================= */
const logoutUser = () => {
  console.warn("🚪 LOGOUT → clearing session");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.replace("/login");
};

/* ================= JWT PARSE ================= */
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    console.error("❌ Invalid JWT");
    return null;
  }
};

/* ================= REFRESH CONTROL ================= */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  console.log("📦 Processing Queue:", failedQueue.length);

  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });

  failedQueue = [];
};

/* ================= TOKEN DEBUG ================= */
const logToken = (token) => {
  const decoded = parseJwt(token);

  if (!decoded?.exp) {
    console.warn("⚠️ No exp in token");
    return 0;
  }

  const expMs = decoded.exp * 1000;
  const nowMs = Date.now();
  const secondsLeft = Math.floor((expMs - nowMs) / 1000);

  console.log("🕒 Expiry:", new Date(expMs));
  console.log("⏳ Time Left:", secondsLeft, "sec");

  return secondsLeft;
};

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    console.log("\n📤 REQUEST:", config.url);

    if (!token) {
      console.warn("⚠️ No token → request without auth");
      return config;
    }

    let timeLeft = logToken(token);

    /* 🔥 FIX: REFRESH BEFORE REQUEST */
    if (timeLeft <= 0) {
      console.warn("❌ Token expired → refreshing BEFORE request");

      if (!refreshToken) {
        logoutUser();
        return Promise.reject("No refresh token");
      }

      /* 🔁 If already refreshing */
      if (isRefreshing) {
        console.log("⏳ Waiting for refresh...");

        token = await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });

        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }

      isRefreshing = true;

      try {
        console.log("🔄 Calling refresh API...");

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
          { refreshToken },
        );

        token = res.data.accessToken;

        console.log("✅ New token received");

        localStorage.setItem("token", token);

        processQueue(null, token);

        config.headers.Authorization = `Bearer ${token}`;

        return config;
      } catch (err) {
        console.error("❌ Refresh failed");
        processQueue(err, null);
        logoutUser();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    /* ⚠️ Token about to expire */
    if (timeLeft < 60) {
      console.warn("⚠️ Token expiring soon");
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE:", response.config.url, response.status);
    return response;
  },

  async (error) => {
    if (!error.response) {
      console.error("🌐 Network error");
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const status = error.response.status;

    console.log("\n❌ ERROR:", status, originalRequest.url);

    /* ❌ Prevent loop */
    if (originalRequest.url.includes("/auth/refresh")) {
      console.error("❌ Refresh API failed → logout");
      logoutUser();
      return Promise.reject(error);
    }

    /* ================= FALLBACK 401 ================= */
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        logoutUser();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        console.log("🔄 Refresh (fallback)...");

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
          { refreshToken },
        );

        const newToken = res.data.accessToken;

        localStorage.setItem("token", newToken);

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        logoutUser();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    /* ================= FORBIDDEN ================= */
    if (status === 403) {
      logoutUser();
    }

    return Promise.reject(error);
  },
);

export default api;
