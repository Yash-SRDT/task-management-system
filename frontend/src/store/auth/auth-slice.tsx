import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  expirationTime: number | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  expirationTime: localStorage.getItem("expirationTime") ? Number(localStorage.getItem("expirationTime")) : null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; expirationTime: number }>) => {
      state.token = action.payload.token;
      state.expirationTime = action.payload.expirationTime;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("expirationTime", action.payload.expirationTime.toString());
    },

    logout: (state) => {
      state.token = null;
      state.expirationTime = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
