import e from "./externalServices.js";
import r from "./productList.js";
import {
  loadHeaderFooter as o,
  getParams as s
} from "./utils.js";
const c = new e,
  t = s("category"),
  i = document.querySelector(".product-list"),
  n = new r(`products/search/${t}`, c, i);
n.init();
const l = t[0],
  u = l.toUpperCase();
document.querySelector(".product-listing-cat").innerHTML = `${u}${t.slice(1,-1)}s`, o();
