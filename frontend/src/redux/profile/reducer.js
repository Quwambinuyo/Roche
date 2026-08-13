import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  profileLoading: false,
  profileError: null,
  passwordLoading: false,
  passwordError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateProfileStart: (state) => {
      state.profileLoading = true;
      state.profileError = null;
    },
    updateProfileSuccess: (state, action) => {
      state.profileLoading = false;
      state.user = { ...state.user, ...action.payload };
    },
    updateProfileFailure: (state, action) => {
      state.profileLoading = false;
      state.profileError = action.payload;
    },
    changePasswordStart: (state) => {
      state.passwordLoading = true;
      state.passwordError = null;
    },
    changePasswordSuccess: (state) => {
      state.passwordLoading = false;
    },
    changePasswordFailure: (state, action) => {
      state.passwordLoading = false;
      state.passwordError = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logout,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
} = authSlice.actions;

export default authSlice.reducer;
