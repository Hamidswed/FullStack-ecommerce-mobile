// product thunk here
import { AppDispatch } from "../store";
import { orderActions } from "../slices/order";

export function fetchOrderData(id: string) {
  const url = `http://localhost:8000/orders/${id}`;
  return async (dispatch: AppDispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(orderActions.getOrderByUserId(data));
  };
}
