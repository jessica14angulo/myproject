import ExternalServices from "./externalServices.js";
import ProductList from "./productList.js";
import { loadHeaderFooter, getParams } from "./utils.js";

const product = new ExternalServices();
const category = getParams("category");
const listElement = document.querySelector(".product-list");
const listProduct = new ProductList(
  `products/search/${category}`,
  product,
  listElement
);
listProduct.init();
const firstletter = category[0];
const letter = firstletter.toUpperCase();

document.querySelector(
  ".product-listing-cat"
).innerHTML = `${letter}${category.slice(1, -1)}s`;

loadHeaderFooter();
