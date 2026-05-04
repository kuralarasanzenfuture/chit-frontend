import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

/* ================= HELPER ================= */

// ✅ Always return string error
const getErrorMessage = (err) => {
  if (typeof err === "string") return err;

  return (
    err?.response?.data?.message ||
    err?.response?.data ||
    err?.message ||
    "Something went wrong"
  );
};

/* ================= THUNKS ================= */

// ✅ CREATE STAFF
export const createStaff = createAsyncThunk(
  "agent/createStaff",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/agent/register", data);
      console.log("✅ Staff Created:", res.data);

      return res.data;
    } catch (err) {
      console.error("❌ CREATE ERROR:", err);
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// ✅ GET ALL STAFF
export const fetchStaff = createAsyncThunk(
  "agent/fetchStaff",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/agent/getStaff");
      console.log("✅ Staff Fetched:", res.data);

      return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
      console.error("❌ FETCH ERROR:", err);
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// ✅ GET BY ID
export const getStaffById = createAsyncThunk(
  "agent/getStaffById",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/agent/getStaff/${id}`);

      console.log("✅ API DATA:", res.data);

      if (!res?.data || typeof res.data !== "object") {
        throw new Error("Invalid API response");
      }

      return res.data;
    } catch (err) {
      console.error("❌ GET BY ID ERROR:", err);
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// ✅ UPDATE
export const updateStaff = createAsyncThunk(
  "agent/updateStaff",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/agent/updateStaff/${id}`, data);
      console.log("✏️ Staff Updated:", res.data);

      return res.data;
    } catch (err) {
      console.error("❌ UPDATE ERROR:", err);
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// ✅ DELETE
export const deleteStaff = createAsyncThunk(
  "agent/deleteStaff",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/agent/deleteStaff/${id}`);
      console.log("🗑️ Staff Deleted:", id);

      return id;
    } catch (err) {
      console.error("❌ DELETE ERROR:", err);
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

/* ================= SLICE ================= */

const agentAndStaffSlice = createSlice({
  name: "agentAndStaff",

  initialState: {
    staff: [],
    selectedStaff: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSelectedStaff: (state) => {
      state.selectedStaff = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= FETCH ALL ================= */
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload || [];
      })

      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
      })

      /* ================= GET BY ID ================= */
      .addCase(getStaffById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedStaff = null;
      })

      .addCase(getStaffById.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload && typeof action.payload === "object") {
          state.selectedStaff = action.payload;
        } else {
          state.selectedStaff = null;
          state.error = "Invalid data format";
        }
      })

      .addCase(getStaffById.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessage(action.payload);
        state.selectedStaff = null;
      })

      /* ================= CREATE ================= */
      .addCase(createStaff.fulfilled, (state, action) => {
        if (action.payload && typeof action.payload === "object") {
          state.staff.push(action.payload);
        }
      })

      .addCase(createStaff.rejected, (state, action) => {
        state.error = getErrorMessage(action.payload);
      })

      /* ================= UPDATE ================= */
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.staff.findIndex(
          (item) => item.id === action.payload?.id
        );

        if (index !== -1) {
          state.staff[index] = action.payload;
        }

        // 🔥 also update selectedStaff if same ID
        if (state.selectedStaff?.id === action.payload?.id) {
          state.selectedStaff = action.payload;
        }
      })

      .addCase(updateStaff.rejected, (state, action) => {
        state.error = getErrorMessage(action.payload);
      })

      /* ================= DELETE ================= */
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.staff = state.staff.filter(
          (item) => item.id !== action.payload
        );

        // 🔥 clear selected if deleted
        if (state.selectedStaff?.id === action.payload) {
          state.selectedStaff = null;
        }
      })

      .addCase(deleteStaff.rejected, (state, action) => {
        state.error = getErrorMessage(action.payload);
      });
  },
});

export const { clearSelectedStaff } = agentAndStaffSlice.actions;
export default agentAndStaffSlice.reducer;