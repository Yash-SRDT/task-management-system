import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

/* ================= TYPES ================= */

export interface CreateTaskPayload {
  title: string;
  description: string;
  assignedUserId: string;
}

interface CreateTaskState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isRun: string;
}

/* ================= INITIAL STATE ================= */

const initialState: CreateTaskState = {
  isLoading: false,
  error: null,
  isSuccess: false,
  isRun: uuidv4(),
};

/* ================= THUNK ================= */

export const createTask = createAsyncThunk<void, CreateTaskPayload, { rejectValue: string }>(
  "task/create",
  async (payload, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/tasks", payload);
      toast.success("Task created successfully");
    } catch (e: any) {
      const message = e.response?.data?.message || "Failed to create task";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

/* ================= SLICE ================= */

const createTaskSlice = createSlice({
  name: "createTask",
  initialState,
  reducers: {
    resetCreateTaskState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
      state.isRun = uuidv4();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isRun = uuidv4();
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to create task";
      });
  },
});

export const { resetCreateTaskState } = createTaskSlice.actions;
export const createTaskReducer = createTaskSlice.reducer;
