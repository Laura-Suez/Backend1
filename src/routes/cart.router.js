import { Router } from "express";

import { ProductManager } from "../manager/product.manager.js";
import { CartManager } from "../manager/cart.manager.js";
import { getValueOrDefault, isNil } from "../utils/utils.js";

const router = Router();

const productManager = new ProductManager("./src/data/productos.json");
const cartManager = new CartManager("./src/data/carritos.json");

router.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartsById(req.params.cid);
    const products = [];
    for (const product of cart.products) {
      const fullProduct = await productManager.getProductById(product.id);

      if (isNil(fullProduct)) {
        continue;
      }
      products.push(fullProduct);
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const oldCart = await cartManager.getCartsById(req.params.cid);
    const productToAdd = await productManager.getProductById(req.params.pid);

    if (isNil(productToAdd)) {
      return res.status(404).json({ msg: "Producto no encontrado." });
    }
    const quantity = getValueOrDefault(req.body.quantity, 1);
    const newCart = await cartManager.addProductToCart(
      oldCart,
      productToAdd,
      quantity
    );
    res.status(201).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

export default router;
