import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

/* ================= TYPES ================= */

export interface LoginUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface LoginState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: LoginUser | null;
  token: string | null;
  error: string | null;
  isRun: string;
}

/* ================= INITIAL STATE ================= */

const initialState: LoginState = {
  isLoading: false,
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  token: localStorage.getItem("token"),
  error: null,
  isRun: uuidv4(),
};

/* ================= THUNKS ================= */

/**
 * LOGIN → returns TOKEN ONLY
 */
export const loginUser = createAsyncThunk<{ token: string }, { email: string; password: string }>(
  "login/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", payload);
      return { token: response.data.token };
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Login failed");
      return rejectWithValue(e.response?.data?.message);
    }
  },
);

/**
 * GET LOGGED-IN USER (/auth/me)
 */
export const fetchLoggedInUser = createAsyncThunk<LoginUser, void>(
  "login/fetchLoggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    } catch (e: any) {
      return rejectWithValue("Failed to fetch logged-in user");
    }
  },
);

/* ================= SLICE ================= */

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");

      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.isRun = uuidv4();

      toast.success("Logged out successfully");
    },

    resetLoginState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isRun = uuidv4();
    },
  },

  extraReducers: (builder) => {
    builder
      /* ===== LOGIN ===== */
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.isRun = uuidv4();

        // ✅ STORE TOKEN ONLY
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Login failed";
      })

      /* ===== FETCH LOGGED-IN USER ===== */
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(fetchLoggedInUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

/* ================= EXPORTS ================= */

export const { logout, resetLoginState } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
