import ExternalServices from "./externalServices.js";
import ProductDetails from "./productDetails.js";
import { getParams } from "./utils.js";
import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

const product = new ExternalServices("tents");
const productId = getParams("product");

const productD = new ProductDetails(productId, product);
productD.init();

// let products = [];

// function setLocalStorage(key, data) {
//   localStorage.setItem(key, JSON.stringify(data));
// }

// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
// function addToCart(e) {
//   const product = products.find((item) => item.Id === e.target.dataset.id);
//   setLocalStorage("so-cart", product);
// }

// add listener to Add to Cart button
// document.getElementById("addToCart").addEventListener("click", addToCart);
