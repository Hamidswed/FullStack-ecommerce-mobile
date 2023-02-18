// product services

import Product, { ProductDocument } from "../models/Product";

const createProduct = async (
  product: ProductDocument
): Promise<ProductDocument> => {
  return product.save();
};

const getProductList = async():Promise<ProductDocument[]>=>{
  return Product.find()
}

export default { createProduct,getProductList };
