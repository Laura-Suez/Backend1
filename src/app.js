import express from "express";
import handlebars from "express-handlebars";

import cartsRouter from "./routes/cart.router.js";
import productsRouter from "./routes/product.router.js";
import viewsRouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
