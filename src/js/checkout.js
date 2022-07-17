import { loadHeaderFooter } from "./utils";
import CheckoutProcess from "./checkoutProcess.js";

loadHeaderFooter();

const checkingOut = new CheckoutProcess("so-cart");

checkingOut.init();
