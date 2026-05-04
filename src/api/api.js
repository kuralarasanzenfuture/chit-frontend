// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
// });

// /* ================= REQUEST ================= */
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token && !config.headers.Authorization) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* ================= RESPONSE ================= */
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (!error.response) return Promise.reject(error);

//     const originalRequest = error.config;
//     const status = error.response.status;

//     if (originalRequest.url.includes("/auth/refresh")) {
//       return Promise.reject(error);
//     }

//     if (status === 401 && !originalRequest._retry) {
//       const refreshToken = localStorage.getItem("refreshToken");

//       if (!refreshToken) {
//         localStorage.clear();
//         window.location.replace("/login");
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
//         const res = await api.post("/auth/refresh", { refreshToken });

//         const newAccessToken = res.data.accessToken;

//         localStorage.setItem("token", newAccessToken);

//         api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

//         processQueue(null, newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         localStorage.clear();
//         window.location.replace("/login");
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL:
    `${import.meta.env.VITE_API_BASE_URL}/api` || "http://localhost:8080/api", // http://localhost:8080/api
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST ================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("🔐 Token:", token);
    console.log("📤 Headers:", config.headers);
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Debug log (DEV only)
    if (import.meta.env.DEV) {
      console.log("📤 Request:", config.url, config.method);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ================= RESPONSE ================= */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log("✅ Response:", response.config.url, response.status);
    }
    return response;
  },
  async (error) => {
    if (!error.response) {
      console.error("🚨 Network Error:", error.message);
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const status = error.response.status;

    // ❌ Avoid infinite loop
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        localStorage.clear();
        window.location.replace("/login");
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

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken },
        );

        const newAccessToken = res.data.accessToken;

        localStorage.setItem("token", newAccessToken);

        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        // processQueue(err, null);
        // localStorage.clear();
        // window.location.replace("/login");
        // return Promise.reject(err);

        if (status === 302) {
          console.warn("⚠️ 302 Redirect detected");

          // 🔥 Debug redirect location
          console.log(
            "➡️ Redirect Location:",
            error.response.headers?.location,
          );

          // Usually session expired or auth issue
          localStorage.clear();
          window.location.replace("/login");

          return Promise.reject({
            message: "Session expired. Please login again.",
          });
        }
      } finally {
        isRefreshing = false;
      }
    }

    console.error("❌ API Error:", error.response?.data || error.message);

    console.error("❌ API Error FULL:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });

    return Promise.reject(error);
  },
);

export default api;
