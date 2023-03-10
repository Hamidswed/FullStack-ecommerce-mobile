//  product slice here
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../../types/productType";

const favouriteItems =
  localStorage.getItem("favorites") !== null
    ? JSON.parse(localStorage.getItem("favorites") as string)
    : [];

const cartItems =
  localStorage.getItem("cart") !== null
    ? JSON.parse(localStorage.getItem("cart") as string)
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
  carts: cartItems,
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
    getCartList: (state, action) => {
      state.carts = action.payload;
    },
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const index = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );
      const updatedProductByQty = { ...action.payload, quantity: 1 };

      if (index === -1) {
        state.carts.push(updatedProductByQty);
        localStorage.setItem(
          "cart",
          JSON.stringify(state.carts.map((item) => item))
        );
      } else {
        state.carts[index].quantity++;
        const cart = JSON.parse(localStorage.getItem("cart") as string);
        cart[index].quantity = state.carts[index].quantity;
        localStorage.setItem(
          "cart",
          JSON.stringify(state.carts.map((item) => item))
        );
      }
    },
    removeFromCart: (state, action) => {
      const index = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.carts[index].quantity === 1 && index >= 0) {
        state.carts.splice(index, 1);
        localStorage.setItem(
          "cart",
          JSON.stringify(state.carts.map((item) => item))
        );
      } else {
        state.carts[index].quantity--;
        const cart = JSON.parse(localStorage.getItem("cart") as string);
        cart[index].quantity = state.carts[index].quantity;
        localStorage.setItem(
          "cart",
          JSON.stringify(state.carts.map((item) => item))
        );
      }
    },
    removeAll: (state, action) => {
      const index = state.carts.findIndex(
        (item) => item._id === action.payload._id
      );
      index >= 0 && state.carts.splice(index, 1);
      localStorage.setItem(
        "cart",
        JSON.stringify(state.carts.map((item) => item))
      );
    },
    totalPrice: (state) => {
      state.totalPrice = state.carts.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
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
