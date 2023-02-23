import ProductDetailItem from "../components/products/productDetail/ProductDetailItem";
import { fetchProductDetail } from "../redux/thunks/productDetail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useParams } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();
  const productDetail = useSelector(
    (state: RootState) => state.product.productDetail
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <ProductDetailItem productDetail={productDetail} />
    </div>
  );
};
export default ProductDetail;
