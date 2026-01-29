import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

/* ================= TYPES ================= */

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface GetAllUsersState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isRun: string;
  users: User[];
}

/* ================= INITIAL STATE ================= */

const initialState: GetAllUsersState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  isRun: uuidv4(),
  users: [],
};

/* ================= THUNK ================= */

export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "users/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/users");
      return res.data.data; // based on successResponse
    } catch (e: any) {
      const message = e.response?.data?.message || "Failed to fetch users";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

/* ================= SLICE ================= */

const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState,
  reducers: {
    resetGetAllUsersState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.isRun = uuidv4();
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
        state.isRun = uuidv4();
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch users";
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetGetAllUsersState } = getAllUsersSlice.actions;
export const getAllUsersReducer = getAllUsersSlice.reducer;
