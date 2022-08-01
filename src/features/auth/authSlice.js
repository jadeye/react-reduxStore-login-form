import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  username: null,
  userPhone: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedIn: null,
  message: "",
  users: [],
};

const url = "http://localhost:3000/db/";
const dbFile = "users.json";

export const getUsersList = createAsyncThunk("auth/getUsersList", async () => {
  const res = await fetch(`${url}${dbFile}`)
    .then((data) => data.json())
    .catch((error) => {
      return error;
    });
  return res;
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserIn: (state, action) => {
      state.username = action.payload.username;
      state.userPhone = action.payload.phone;
      state.isLoggedIn = true;
    },
    logUserOut: (state, action) => {
      state.username = "";
      state.userPhone = "";
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersList.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users.push(payload);
    });
    builder.addCase(getUsersList.rejected, (state, { payload }) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = payload;
    });
  },
});
export const { logUserIn, logUserOut } = authSlice.actions;
export default authSlice.reducer;
