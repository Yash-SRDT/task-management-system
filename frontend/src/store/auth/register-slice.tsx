import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

/* ================= TYPES ================= */

interface RegisterState {
  isLoading: boolean;
  error: string | null;
  registeredUserId: string | null;
  isRun: string;
}

/* ================= INITIAL STATE ================= */

const initialState: RegisterState = {
  isLoading: false,
  error: null,
  registeredUserId: null,
  isRun: uuidv4(),
};

/* ================= ASYNC THUNKS ================= */

/**
 * SIGNUP
 */
// export const registerUser = createAsyncThunk<{ userId: string }, { name: string; email: string; password: string }>(
//   "register/signup",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post("/auth/signup", payload);
//       toast.success("Signup successful. Please choose role.");
//       return response.data; // must contain userId
//     } catch (e: any) {
//       toast.error(e.response?.data?.message || "Signup failed");
//       return rejectWithValue(e.response?.data?.message);
//     }
//   },
// );

export const registerUser = createAsyncThunk<{ userId: string }, { name: string; email: string; password: string }>(
  "register/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", payload);

      return {
        userId: response.data.userId || response.data._id,
      };
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message);
    }
  },
);

/**
 * SELECT ROLE
 */
export const chooseRole = createAsyncThunk<void, { userId: string; role: "admin" | "user" }>(
  "register/selectRole",
  async (payload, { rejectWithValue }) => {
    try {
      await axiosInstance.patch("/auth/role", payload);
      toast.success("Role selected successfully. Please login.");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Role selection failed");
      return rejectWithValue(e.response?.data?.message);
    }
  },
);

/* ================= SLICE ================= */

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.registeredUserId = null;
      state.isRun = uuidv4();
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== SIGNUP ===== */
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registeredUserId = action.payload.userId;
        state.isRun = uuidv4();
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Signup failed";
      })

      /* ===== SELECT ROLE ===== */
      .addCase(chooseRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(chooseRole.fulfilled, (state) => {
        state.isLoading = false;
        state.isRun = uuidv4();
      })
      .addCase(chooseRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Role selection failed";
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetRegisterState } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
