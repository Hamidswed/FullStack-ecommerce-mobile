import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/userType";

type InitialType = {
  user: UserType;
  isLogin: boolean;
};

const user =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user") as string)
    : {};

const initialState: InitialType = {
  user: user,
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    loginHandler: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
