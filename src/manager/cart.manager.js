import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    if (fs.existsSync(this.path)) {
      const carts = await fs.promises.readFile(this.path, "utf8");
      return JSON.parse(carts);
    } else return [];
  }

  async getCartsById(id) {
    const carts = await this.getCarts();
    return carts.find((u) => u.id === id);
  }

  async createCart() {
    const cart = {
      id: uuidv4(),
      products: [],
    };

    const carts = await this.getCarts();
    carts.push(cart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts));

    return carts;
  }

  async addProductToCart(cart, product, quantity) {
    let productAlreadyExists = false;
    for (let p of cart.products) {
      if (p.id === product.id) {
        p.quantity += quantity;
        productAlreadyExists = true;
        break;
      }
    }
    if (!productAlreadyExists) {
      cart.products.push({ id: product.id, quantity: quantity });
    }

    const carts = await this.getCarts();
    const newCarts = carts.filter((c) => c.id !== cart.id);
    newCarts.push(cart);

    await fs.promises.writeFile(this.path, JSON.stringify(newCarts));
    return cart;
  }
}
