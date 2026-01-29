import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

/* ================= TYPES ================= */

export interface LoggedInUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

interface UserState {
  user: LoggedInUser | null;
  isLoading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

/* ================= ASYNC THUNK ================= */

export const getUserDetails = createAsyncThunk<LoggedInUser, void, { rejectValue: string }>(
  "user/getUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/me");

      const user = res.data?.data?.[0];

      if (!user) {
        throw new Error("User not found");
      }

      return user; // 👈 single user object
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch user details");
    }
  },
);

/* ================= SLICE ================= */

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
