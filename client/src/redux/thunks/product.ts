// product thunk here
import { AppDispatch } from "../store";
import { productActions } from "./../slices/product";
import { url } from "../../App";

export function fetchProductData() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${url}/products`);
    const data = await response.json();
    dispatch(productActions.getProductList(data));
  };
}
