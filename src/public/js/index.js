const socket = io();

let productsList = document.getElementById("products");

socket.on("products", (products) => {
  let productsInfo = "";
  products.forEach((product) => {
    productsInfo += `[${product.code}] ${product.title}: ${product.description}  --  $${product.price} (${product.stock} unidades) </br>`;
  });
  productsList.innerHTML = productsInfo;
});

const addForm = document.getElementById("add-product");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");

addForm.onsubmit = (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const description = inputDescription.value;
  const price = inputPrice.value;
  const code = inputCode.value;
  const stock = inputStock.value;
  const product = {
    title,
    description,
    price,
    code,
    stock,
  };
  socket.emit("newProduct", product);
};

const deleteForm = document.getElementById("delete-product");
const inputCodeDelete = document.getElementById("code-delete");
deleteForm.onsubmit = (e) => {
  e.preventDefault();
  const code = inputCodeDelete.value;
  socket.emit("deleteProduct", code);
};
