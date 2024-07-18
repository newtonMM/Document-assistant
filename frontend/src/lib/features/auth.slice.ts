import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginService, signupService } from "../thunks/auth";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface Payload extends JwtPayload {
  userId: number;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  errOccurred: boolean;
  message: string;
  userId: number | undefined;
  isSuccessful: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  errOccurred: false,
  message: "",
  userId: undefined,
  isSuccessful: false,
};

const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    handleLogout(state) {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginService.pending, (state) => {
        state.loading = true;
        state.errOccurred = false;
        state.isAuthenticated = false;
      })
      .addCase(loginService.fulfilled, (state, action) => {
        state.loading = false;
        const decoded = jwtDecode<Payload>(action.payload.token);
        state.isAuthenticated = true;
        state.userId = decoded.userId;
        state.loading = false;
      })
      .addCase(loginService.rejected, (state, action) => {
        state.errOccurred = true;
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(signupService.pending, (state) => {
        state.loading = true;
        state.errOccurred = false;
        state.isSuccessful = false;
      })
      .addCase(signupService.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccessful = true;
      })
      .addCase(signupService.rejected, (state, action) => {
        state.errOccurred = true;
        state.isSuccessful = false;
      });
  },
});
export const { handleLogout } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
