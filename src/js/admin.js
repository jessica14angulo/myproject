import ExternalServices from "./externalServices.js";

class Admin {
  constructor(parent) {
    this.parentElement = parent;
    this.token = null;
    this.services = new ExternalServices();
  }

  async login(creds) {
    try {
      this.token = await this.services.loginRequest(creds);
      this.next();
    } catch (err) {
      alert(err.message.message);
    }
  }

  async next() {
    const orders = await this.services.fetchOrders(this.token.accessToken);
    this.showOrders(orders);
  }

  showLogin() {
    const template = document.querySelector("#login-template");
    const clone = template.content.cloneNode(true);
    this.parentElement.appendChild(clone);

    const form = document.querySelector("#login-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formObj = new FormData(e.target);

      const formJSON = {};

      for (let key of formObj.keys()) {
        formJSON[key] = formObj.get(key);
      }
      this.login(formJSON);
    });
  }

  showOrders(orders) {
    this.parentElement.innerHTML = this.orderHtml();
    const parent = document.querySelector("#orders tbody");
    parent.innerHTML = orders
      .map(
        (order) =>
          `<tr><td>${order.id}</td><td>${new Date(
            order.orderDate
          ).toLocaleDateString("en-US")}</td>${this.orderItems(
            order.items
          )}<td>${order.orderTotal}</td></tr>`
      )
      .join("");

    this.parentElement.innerHTML += parent;
  }

  orderItems(list) {
    const products = [];
    if (Array.isArray(list)) {
      for (let index = 0; index < list.length; index++) {
        products.push(
          `<li>${list[index].name} <span> Quantity: ${list[index].quantity}</span></li>`
        );
      }
      return `<td>${products.join("")}</td>`;
    } else {
      return `<td>${products.join("")}</td>`;
    }
  }

  orderHtml() {
    return `<h2>Current Orders</h2>
  <table id="orders">
  <thead>
  <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
  </thead>
  <tbody class="order-body"></tbody>
  </table>
  `;
  }
}

const parentElement = document.querySelector(".admin-container");
const myAdmin = new Admin(parentElement);
myAdmin.showLogin();
