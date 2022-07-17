import { loadHeaderFooter, getParams } from "./utils.js";

loadHeaderFooter();
// get the order ID
document.querySelector("#success-id").innerHTML = getParams("orderID");
