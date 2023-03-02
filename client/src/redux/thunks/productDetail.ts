import { AppDispatch } from "../store";
import { productActions } from "./../slices/product";
import { url } from "../../App";

export function fetchProductDetail(id: string | undefined) {
  return async (dispatch: AppDispatch) => {
    const response = await fetch(`${url}/products/${id}`);
    const data = await response.json();
    dispatch(productActions.getProductDetail(data));
  };
}
