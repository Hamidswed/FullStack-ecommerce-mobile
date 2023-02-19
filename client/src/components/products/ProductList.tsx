import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchProductDate } from "./../../redux/thunks/product";

export default function ProductList() {
  const productList = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProductDate());
  }, [dispatch]);
  console.log(productList);
  
  return <div>ProductList</div>;
}
