import ProductList from "../components/products/productList/ProductList";
import Search from "../components/search/Search";

const Products = () => {
  return (
    <div className="product-page">
      <Search/>
      <ProductList />
    </div>
  );
};

export default Products;
