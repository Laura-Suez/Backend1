import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import cartsRouter from "./routes/cart.router.js";
import productsRouter from "./routes/product.router.js";
import viewsRouter from "./routes/views.router.js";

import { ProductManager } from "./manager/product.manager.js";

import { __dirname } from "./utils.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () =>
  console.log(`Servidor corriendo en puerto ${PORT}`)
);
const socketServer = new Server(httpServer);

const productManager = new ProductManager("./src/data/productos.json");
let products = await productManager.getProducts();

socketServer.on("connection", (socket) => {
  socketServer.emit("products", products);

  socket.on("newProduct", (product) => {
    products.push(product);
    socketServer.emit("products", products);
  });

  socket.on("deleteProduct", (code) => {
    products = products.filter((product) => product.code != code);
    socketServer.emit("products", products);
  });
});
