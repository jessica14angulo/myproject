import ExternalServices from "./externalServices.js";
import ProductDetails from "./productDetails.js";
import { getParams } from "./utils.js";
import { loadHeaderFooter } from "./utils.js";

loadHeaderFooter();

const product = new ExternalServices("tents");
const productId = getParams("product");

const productD = new ProductDetails(productId, product);
productD.init();
