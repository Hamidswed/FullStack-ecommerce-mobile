import { createSlice } from "@reduxjs/toolkit";
import { OrderType } from "../../types/orderType";

type InitialType = {
  order: OrderType[];
};
const initialState: InitialType = {
  order:[]
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderByUserId: (state, action) => {
      state.order = action.payload;
    },
  },
});
export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
