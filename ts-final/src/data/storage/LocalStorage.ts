import { Product } from "./../product/product.ts";
import axios from "axios";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await axios.get("http://localhost:3000/all-products");
    return response.data;
  } catch (error) {
    console.error("Failed to get products:", error);
    throw error;
  }
}

export async function getProductsByTypeRequest(
  type: string
): Promise<Product[]> {
  const response = await axios.get("http://localhost:3000/all-products");
  return response.data.filter(
    (product: Product) =>
      product.type.toLocaleLowerCase() == type.toLocaleLowerCase()
  );
}
