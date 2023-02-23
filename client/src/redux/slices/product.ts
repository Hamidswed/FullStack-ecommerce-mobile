//  product slice here
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../../types/productType";

const favouriteItems =
  localStorage.getItem("favorites") != null
    ? JSON.parse(localStorage.getItem("favorites") as string)
    : [];

type InitialType = {
  products: ProductType[];
  productDetail: ProductType;
  favorites: ProductType[];
  carts: ProductType[];
  totalPrice: number;
};
const initialState: InitialType = {
  products: [],
  productDetail: {
    _id: "",
    title: "",
    price: 0,
    productImage: "",
    detailImage: "",
    quantity: 0,
    description: "",
  },
  favorites: favouriteItems,
  carts: [],
  totalPrice: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductList: (state, action) => {
      state.products = action.payload;
    },
    getProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const index = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );
      // const updatedProduct = { ...action.payload, qty: 1 };

      if (index === -1) {
        state.carts.push(action.payload);
      } else {
        state.carts[index].quantity++;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.carts[index].quantity === 1 && index >= 0) {
        state.carts.splice(index, 1);
      } else {
        state.carts[index].quantity--;
      }
    },
    removeAll: (state, action) => {
      const index = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );
      index >= 0 && state.carts.splice(index, 1);
    },
    totalPrice: (state) => {
      state.totalPrice = state.carts.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);
    },
    addToFavorite: (state, action) => {
      const index = state.favorites.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index === -1) {
        state.favorites.push(action.payload);
        localStorage.setItem(
          "favorites",
          JSON.stringify(state.favorites.map((item) => item))
        );
      }
    },
    removeFromFavorite: (state, action) => {
      const index = state.favorites.findIndex(
        (item) => item._id === action.payload._id
      );
      index >= 0 && state.favorites.splice(index, 1);
      localStorage.setItem(
        "favorites",
        JSON.stringify(state.favorites.map((item) => item))
      );
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
