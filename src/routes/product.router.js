import { Router } from "express";
import { ProductManager } from "../manager/product.manager.js";
import { isNil } from "../utils/utils.js";

const productManager = new ProductManager("./src/data/productos.json");

const router = Router();

const productCreationValidator = (req, res, next) => {
  if (isNil(req.body.title)) {
    return res.status(400).json({ msg: "El campo 'title' es obligatorio." });
  }
  if (isNil(req.body.description)) {
    return res
      .status(400)
      .json({ msg: "El campo 'description' es obligatorio." });
  }
  if (isNil(req.body.code)) {
    return res.status(400).json({ msg: "El campo 'code' es obligatorio." });
  }
  if (isNil(req.body.price)) {
    return res.status(400).json({ msg: "El campo 'price' es obligatorio." });
  }
  if (isNil(req.body.stock)) {
    return res.status(400).json({ msg: "El campo 'stock' es obligatorio." });
  }
  if (isNil(req.body.category)) {
    return res.status(400).json({ msg: "El campo 'category' es obligatorio." });
  }
  next();
};

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const product = products.find((p) => p.id === req.params.id);
    if (isNil(product)) {
      res.status(404).json({ msg: "Producto no encontrado." });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.post("/", productCreationValidator, async (req, res) => {
  try {
    const product = await productManager.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!isNil(req.body.id) && req.body.id !== req.params.id) {
      return res
        .status(400)
        .json({ msg: "El ID del producto no puede ser modificado." });
    }

    const product = await productManager.updateProduct(req.body, req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await productManager.deleteProduct(req.params.id);
    if (isNil(product)) {
      res.status(404).json({ msg: "Producto no encontrado." });
    } else {
      res.status(200).json({ msg: "Producto eliminado correctamente." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

export default router;
