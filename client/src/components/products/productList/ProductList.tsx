import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchProductData } from "../../../redux/thunks/product";
import ProductItem from "../productItem/ProductItem";
import "./productList.css";

export default function ProductList() {
  const userInput = useSelector((state: RootState) => state.search.userInput);
  const productList = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    userInput === "" && dispatch(fetchProductData());
  }, [dispatch, userInput]);

  return (
    <div className="product-list">
      {productList.length !== 0 ? (
        productList.map((item) => {
          return <ProductItem key={item._id} product={item} />;
        })
      ) : (
        <div className="loading">
           <i className="fas fa-spinner fa-spin fa-xl" />
           <em>Please wait...</em>
        </div>
       
      )}
    </div>
  );
}
