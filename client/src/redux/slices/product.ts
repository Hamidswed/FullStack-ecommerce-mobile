//  product slice here
import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/productType";

type InitialType = {
  products: ProductType[];
};
const initialState: InitialType = {
  products: [],
};

const productSlice = createSlice({
  name:"product",
  initialState,
  reducers:{
    getProductList:(state,action)=>{
      state.products = action.payload
    }
  }
})

export const productActions = productSlice.actions
export default productSlice.reducer