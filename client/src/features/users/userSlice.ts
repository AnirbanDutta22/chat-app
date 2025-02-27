import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    name: string;
    username: string;
    email: string;
    avatar?: string;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

// Initial State
const initialState: UserState = {
  user: null,
  status: "idle",
};

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserProfile: (
      state,
      action: PayloadAction<{
        name: string;
        username: string;
        email: string;
        avatar?: string;
      }>
    ) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    clearUserProfile: (state) => {
      state.user = null;
    },
  },
});

export const { fetchUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
