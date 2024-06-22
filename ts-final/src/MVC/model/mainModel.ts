import { Product } from "./../../data/product/product";
import {
  getAllProducts,
  getProductsByTypeRequest,
} from "./../../data/storage/LocalStorage";

export class MainModel {
  public products: Product[] = [];
  constructor() {
    this.initializeProducts();
  }

  public async initializeProducts() {
    try {
      const products = await getAllProducts();
      this.products = products;
    } catch (error) {
      console.error("Failed to get products:", error);
    }
  }

  public async getProductsByType(type: string): Promise<Product[]> {
    try {
      if (type.trim() === "All Products") {
        this.products = await getAllProducts();
      } else {
        this.products = await getProductsByTypeRequest(type);
      }
    } catch (error) {
      console.error(`Failed to get products by type: ${type}`, error);
    }
    return this.products;
  }

  public productFiltering(filterParam: string): Product[] {
    const parsePrice = (price: string): number =>
      parseFloat(price.replace("$", ""));
    const sortedProducts = [...this.products];

    if (filterParam === "price") {
      sortedProducts.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (filterParam === "fullname") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sortedProducts;
  }
}
