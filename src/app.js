import express from "express";

import productsRouter from "./routes/product.router.js";
import cartsRouter from "./routes/cart.router.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
