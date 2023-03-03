import { createSlice } from "@reduxjs/toolkit";
import { OrderType } from "../../types/orderType";

const orderItems =
  localStorage.getItem("order") !== null
    ? JSON.parse(localStorage.getItem("order") as string)
    : [];

type InitialType = {
  order: OrderType[];
};
const initialState: InitialType = {
  order: orderItems,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderByUserId: (state, action) => {
      state.order = action.payload;
      localStorage.setItem(
        "order",
        JSON.stringify(state.order.map((item) => item))
      );
    },
  },
});
export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
