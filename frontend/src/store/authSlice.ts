import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  redirectPath: string | null;
  user: {
    fullName: string;
    email: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  redirectPath: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRedirectPath: (state, action: PayloadAction<string>) => {
      state.redirectPath = action.payload;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ fullName: string; email: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.redirectPath = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.redirectPath = null;
    },
  },
});

export const { setRedirectPath, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
