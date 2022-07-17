import {
  loadHeaderFooter as t,
  totalToPage as o
} from "./utils.js";
import r from "./cartList.js";
t();
const a = new r("so-cart", document.querySelector(".product-list"));
a.init(), window.onload = o;
