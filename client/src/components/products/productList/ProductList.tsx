import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchProductDate } from "../../../redux/thunks/product";
import ProductItem from "../productItem/ProductItem";
import "./productList.css"

export default function ProductList() {
  const productList = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProductDate());
  }, [dispatch]);
  console.log(productList);

  return (
    <div className="product-list">
      {productList.map((item) => {
        return <ProductItem key={item._id} product={item} />;
      })}
    </div>
  );
}
