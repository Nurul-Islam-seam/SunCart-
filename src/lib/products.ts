import products from "@/data/products.json";
import type { Product } from "@/types/product";

export const productList = products as Product[];

export const getProductById = (id: number) =>
  productList.find((product) => product.id === id);
