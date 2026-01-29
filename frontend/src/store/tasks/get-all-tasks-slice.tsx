import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

export interface Task {
  id: string;
  title: string;
  assignedUserName: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: any;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const fetchAllTasks = createAsyncThunk<Task[]>("tasks/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/tasks");
    return res.data.data; // assuming { status, message, data }
  } catch {
    return rejectWithValue("Failed to fetch tasks");
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const getAllTasksReducer = taskSlice.reducer;
