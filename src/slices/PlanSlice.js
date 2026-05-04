// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../api/api";

// /* ================= THUNKS ================= */

// // ✅ GET ALL
// export const fetchPlans = createAsyncThunk(
//   "plans/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const res = await api.get("api/plans-all");
//       console.log("✅ Plans Fetched:", res.data);
//       return res.data;
//     } catch (err) {
//       console.error("❌ fetchPlans:", err.response?.data);
//       return thunkAPI.rejectWithValue(
//         err.response?.data || "Error fetching plans"
//       );
//     }
//   }
// );

// // ✅ CREATE
// export const createPlan = createAsyncThunk(
//   "plans/create",
//   async (data, thunkAPI) => {
//     try {
//       const res = await api.post("api/plan", data);
//       console.log("✅ Plan Created:", res.data);
//       return res.data;
//     } catch (err) {
//       console.error("❌ createPlan:", err.response?.data);
//       return thunkAPI.rejectWithValue(
//         err.response?.data || "Create failed"
//       );
//     }
//   }
// );

// // ✅ UPDATE
// export const updatePlan = createAsyncThunk(
//   "plans/update",
//   async ({ id, data }, thunkAPI) => {
//     try {
//       const res = await api.put(`api/plan/${id}`, data);
//       console.log("✏️ Plan Updated:", res.data);
//       return res.data;
//     } catch (err) {
//       console.error("❌ updatePlan:", err.response?.data);
//       return thunkAPI.rejectWithValue(
//         err.response?.data || "Update failed"
//       );
//     }
//   }
// );

// // ✅ DELETE
// export const deletePlan = createAsyncThunk(
//   "plans/delete",
//   async (id, thunkAPI) => {
//     try {
//       await api.delete(`api/plan/${id}`);
//       console.log("🗑️ Plan Deleted:", id);
//       return id;
//     } catch (err) {
//       console.error("❌ deletePlan:", err.response?.data);
//       return thunkAPI.rejectWithValue(
//         err.response?.data || "Delete failed"
//       );
//     }
//   }
// );

// /* ================= SLICE ================= */

// const PlanSlice = createSlice({
//   name: "plans",
//   initialState: {
//     plans: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       // FETCH
//       .addCase(fetchPlans.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPlans.fulfilled, (state, action) => {
//         state.loading = false;
//         state.plans = action.payload;
//       })
//       .addCase(fetchPlans.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // CREATE
//       .addCase(createPlan.fulfilled, (state, action) => {
//         state.plans.push(action.payload);
//       })

//       // UPDATE
//       .addCase(updatePlan.fulfilled, (state, action) => {
//         const index = state.plans.findIndex(
//           (p) => p.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.plans[index] = action.payload;
//         }
//       })

//       // DELETE
//       .addCase(deletePlan.fulfilled, (state, action) => {
//         state.plans = state.plans.filter(
//           (p) => p.id !== action.payload
//         );
//       });
//   },
// });

// export default PlanSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

/* ================= GET ALL ================= */
export const fetchPlans = createAsyncThunk(
  "plans/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/plans-all");
      console.log("✅ Plans Fetched:", res.data);

      // ensure always array
      return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
      console.error("❌ fetchPlans:", err.response?.data);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error fetching plans"
      );
    }
  }
);

/* ================= CREATE ================= */
export const createPlan = createAsyncThunk(
  "plans/create",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/plan", data);
      console.log("✅ Plan Created:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ createPlan:", err.response?.data);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Create failed"
      );
    }
  }
);

/* ================= UPDATE ================= */
export const updatePlan = createAsyncThunk(
  "plans/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/plan/${id}`, data);
      console.log("✏️ Plan Updated:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ updatePlan:", err.response?.data);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Update failed"
      );
    }
  }
);

/* ================= DELETE ================= */
export const deletePlan = createAsyncThunk(
  "plans/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/plan/${id}`);
      console.log("🗑️ Plan Deleted:", id);
      return id;
    } catch (err) {
      console.error("❌ deletePlan:", err.response?.data);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Delete failed"
      );
    }
  }
);

/* ================= SLICE ================= */
const PlanSlice = createSlice({
  name: "plans",
  initialState: {
    plans: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload || [];
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.plans = [];
      })

      .addCase(createPlan.fulfilled, (state, action) => {
        state.plans.unshift(action.payload);
      })

      .addCase(updatePlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.plans[index] = action.payload;
      })

      .addCase(deletePlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default PlanSlice.reducer;