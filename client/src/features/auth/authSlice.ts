import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signupAPI, loginAPI, logoutAPI } from "./authAPI";
import { fetchUserProfile } from "../users/userSlice";
import { LoginType, SignupType } from "../../types";

interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

// Initial State
const initialState: AuthState = {
  token: null,
  status: "idle",
};

// Async Thunks
// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData: SignupType, { dispatch }) => {
    const response = await signupAPI(formData);
    dispatch(fetchUserProfile(response.user)); // Update userSlice with user details
    return response;
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (formData: LoginType, { dispatch }) => {
    const response = await loginAPI(formData);
    dispatch(fetchUserProfile(response.user)); // Update userSlice with user details
    return response;
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  return await logoutAPI();
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.token = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        signup.fulfilled,
        (
          state,
          action: PayloadAction<{
            token: string;
          }>
        ) => {
          state.status = "succeeded";
          state.token = action.payload.token;
        }
      )
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{
            token: string;
          }>
        ) => {
          state.status = "succeeded";
          state.token = action.payload.token;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.status = "idle";
      });
  },
});

// Export actions & reducer
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
