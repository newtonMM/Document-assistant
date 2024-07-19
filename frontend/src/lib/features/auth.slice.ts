import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginService, signupService, logOutService } from "../thunks/auth";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toast } from "react-toastify";

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
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  errOccurred: false,
  message: "",
  userId: undefined,
  isSuccessful: false,
  token: "",
};

const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginService.pending, (state) => {
        state.loading = true;
        state.errOccurred = false;
        state.isAuthenticated = false;
      })
      .addCase(loginService.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        const decoded = jwtDecode<Payload>(action.payload.token);
        state.isAuthenticated = true;
        state.userId = decoded.userId;
        state.loading = false;
      })
      .addCase(loginService.rejected, (state, action) => {
        state.errOccurred = true;
        state.loading = false;
        state.isAuthenticated = false;
        toast.error("an error occurred");
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
        toast.error("an error occurred");
      })
      .addCase(logOutService.pending, (state) => {
        state.loading = true;
        state.errOccurred = false;
        state.isSuccessful = false;
      })
      .addCase(logOutService.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccessful = true;
        state.isAuthenticated = false;
      })
      .addCase(logOutService.rejected, (state, action) => {
        state.errOccurred = true;
        state.isSuccessful = false;
        toast.error("an error occurred");
      });
  },
});

export default AuthenticationSlice.reducer;
