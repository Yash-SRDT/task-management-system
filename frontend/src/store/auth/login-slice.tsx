import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

export const loginUser = createAsyncThunk<{ token: string }, { email: string; password: string }>(
  "login/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", payload);

      const token = res.data?.data?.[0]?.token;

      if (!token) {
        throw new Error("Token not found in response");
      }

      toast.success("Login successful");

      return { token };
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Login failed");
      return rejectWithValue(e.response?.data?.message);
    }
  },
);

const loginSlice = createSlice({
  name: "login",
  initialState: { isLoading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Login failed";
      });
  },
});

export const loginReducer = loginSlice.reducer;
