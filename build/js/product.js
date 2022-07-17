import t from "./externalServices.js";
import r from "./productDetails.js";
import {
  getParams as o
} from "./utils.js";
import {
  loadHeaderFooter as e
} from "./utils.js";
e();
const s = new t("tents"),
  i = o("product"),
  c = new r(i, s);
c.init();
