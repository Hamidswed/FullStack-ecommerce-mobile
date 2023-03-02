import { AppDispatch } from "../store";
import { productActions } from "./../slices/product";

export function fetchProductDetail(id: string | undefined) {
  const url = `https://phone-backend-onsg.onrender.com/products/${id}`;
  return async (dispatch: AppDispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(productActions.getProductDetail(data));
  };
}
