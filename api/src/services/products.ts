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

const deleteProductById = async(id:string):Promise<ProductDocument|null>=>{
  return Product.findByIdAndDelete(id)
}

export default { createProduct,getProductList,deleteProductById };
