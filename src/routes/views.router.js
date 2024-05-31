import { Router } from "express";
import { ProductManager } from "../manager/product.manager.js";

const router = Router();

const productManager = new ProductManager("./src/data/productos.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
