// product thunk here
import { AppDispatch } from "../store";
import { productActions } from "./../slices/product";

const url = "https://phone-backend-onsg.onrender.com/products";
export function fetchProductData() {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(productActions.getProductList(data));
  };
}
