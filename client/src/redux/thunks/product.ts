// product thunk here
import { AppDispatch } from "../store";
import { productActions } from "./../slices/product";

const url = "http://localhost:8000/products";
export function fetchProductDate() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(productActions.getProductList(data));
  };
}
