import {
  getLocalStorage,
  getTotal,
  setLocalStorage,
  renderWithTemplate,
} from "./utils";
import ExternalServices from "./externalServices";

function packageItems(items) {
  const newArray = items.map((product) => {
    const newProduct = {};

    newProduct.id = product.Id;
    newProduct.name = product.Name;
    newProduct.price = product.FinalPrice;
    newProduct.quantity = product.count;

    return newProduct;
  });

  return newArray;
}

export default class CheckoutProcess {
  constructor(key) {
    this.key = key;
    this.list = [];
    this.numbOfItems = 0;
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.subtotal();

    document.querySelector("#checkout-form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.checkout(e.target);
    });
  }

  subtotal() {
    const [totalAmount, totalInCart] = getTotal();

    this.numbOfItems = totalInCart;
    this.itemTotal = totalAmount;

    document.querySelector("#items-number").innerHTML = this.numbOfItems;
    document.querySelector(".cart-subtotal").innerHTML = `$${parseFloat(
      this.itemTotal
    ).toFixed(2)}`;

    this.finalTotal();
  }

  finalTotal() {
    document.querySelector("#zip-code").addEventListener("change", () => {
      this.shipping = 10 + (this.numbOfItems - 1) * 2;
      this.tax = this.itemTotal * 0.06;
      this.orderTotal = this.itemTotal + this.shipping + this.tax;

      this.displayTotal();
    });
  }

  displayTotal() {
    document.querySelector("#shipping").innerHTML = `$${parseFloat(
      this.shipping
    ).toFixed(2)}`;
    document.querySelector("#tax").innerHTML = `$${parseFloat(this.tax).toFixed(
      2
    )}`;
    document.querySelector("#final-total").innerHTML = `$${parseFloat(
      this.orderTotal
    ).toFixed(2)}`;
  }

  async checkout(form) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const formObj = new FormData(form);
    const currentDate = new Date();
    const formJSON = {}; //I will turn Form Data to JSON.
    const simplifiedItems = packageItems(this.list); // Simplified list.

    for (let key of formObj.keys()) {
      formJSON[key] = formObj.get(key);
    }

    formJSON.orderDate = currentDate; // Adding date and simplified list to JSON.
    formJSON.items = simplifiedItems;

    // call the checkout method in our ExternalServices module and send it our data object.

    try {
      const external = new ExternalServices();
      const orderInfo = await external.checkout(formJSON);
      setLocalStorage(this.key, []);
      document.getElementById("checkout-form").reset();

      window.location.assign(`../checkedout/?orderID=${orderInfo.orderId}`);
    } catch (err) {
      const error = await err.message;

      for (let key of Object.keys(error)) {
        const errormessage = error[key];
        this.render(errormessage);
      }
    }
  }

  render(error) {
    const template = document.getElementById("checkout-alert");
    const parent = document.querySelector(".parent-alert");
    renderWithTemplate(template, parent, error, this.prepareTemplate);
    const errorClass = error.replace(/\s/g, "");
    document.querySelector(`.${errorClass}`).addEventListener("click", () => {
      document.querySelector(`#${errorClass}`).remove();
    });
  }

  prepareTemplate(template, error) {
    template.querySelector(".error-type").innerHTML = error;
    template.querySelector(".alertparenttemplate").id = error.replace(
      /\s/g,
      ""
    );
    template
      .querySelector("#error-button")
      .classList.add(error.replace(/\s/g, ""));

    return template;
  }
}
