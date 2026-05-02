import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  exsistingUser: null,
  loading: false,
  uploading: false, // ✅ for file upload
  error: null,
};

export const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setErrors: (state, action) => {
      state.loading = false;
      state.uploading = false;
      state.error = action.payload;
    },

    // ✅ FILE UPLOAD START
    uploadStart: (state) => {
      state.uploading = true;
    },

    // ✅ FILE UPLOAD SUCCESS
    uploadSuccess: (state, action) => {
      state.uploading = false;

      // store uploaded image URL in existing user
      if (state.exsistingUser) {
        state.exsistingUser.profileImage = action.payload;
      }
    },

    addUser: (state, action) => {
      state.user.push(action.payload);
      state.loading = false;
      state.error = null;
    },

    setExsistingUser: (state, action) => {
      state.exsistingUser = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },

    updateUser: (state, action) => {
      const index = state.user.findIndex((u) => u.id === action.payload.id);

      if (index !== -1) {
        state.user[index] = action.payload;
      }

      // ✅ FIXED
      state.exsistingUser = null;
    },

    deleteUser: (state, action) => {
      state.user = state.user.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setLoading, setErrors, uploadStart, uploadSuccess, addUser, setExsistingUser, setUser, updateUser, deleteUser } =
  CustomerSlice.actions;

export default CustomerSlice.reducer;
