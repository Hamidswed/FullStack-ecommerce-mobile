// product controller
import { Request, Response } from "express";
import Product from "../models/Product";
import ProductServices from "../services/products";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      productImage: req.body.productImage,
      detailImage: req.body.detailImage,
      description: req.body.description,
    });
    const product = await ProductServices.createProduct(newProduct);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

export const getProductListController = async (req: Request, res: Response) => {
  try {
    const productList = await ProductServices.getProductList();
    res.json(productList);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const foundProduct = await ProductServices.deleteProductById(req.params.id);
    res.json(foundProduct);
  } catch (error) {
    console.log(error);
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await ProductServices.updateProduct(
      req.params.id,
      req.body
    );
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
  }
};
