import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import { getValueOrDefault, isNil } from "../utils/utils.js";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    if (fs.existsSync(this.path)) {
      const products = await fs.promises.readFile(this.path, "utf8");
      return JSON.parse(products);
    } else return [];
  }

  async createProduct(productJson) {
    // TODO: Run validations?
    const product = {
      ...productJson,
      id: uuidv4(),
      status: getValueOrDefault(productJson.status, true),
    };

    const products = await this.getProducts();
    products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(products));

    return product;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((u) => u.id === id);
  }

  async updateProduct(newFields, productId) {
    const products = await this.getProducts();
    const oldProduct = await this.getProductById(productId);
    if (isNil(oldProduct)) {
      return null;
    }

    const updatedProduct = { ...oldProduct, ...newFields };
    const newProducts = products.filter((p) => p.id !== productId);
    newProducts.push(updatedProduct);

    await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
    return updatedProduct;
  }

  async deleteProduct(id) {
    const product = await this.getProductById(id);
    if (isNil(product)) {
      return null;
    }
    const products = await this.getProducts();
    const newProducts = products.filter((u) => u.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
    return product;
  }
}
