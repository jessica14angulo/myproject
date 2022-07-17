//convert to text
function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  callback
) {
  parentElement.innerHTML = "";

  list.forEach((product) => {
    const clone = template.content.cloneNode(true);
    parentElement.appendChild(callback(clone, product));
  });
}

export function renderWithTemplate(template, parentElement, data, callback) {
  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);
  }
  parentElement.appendChild(clone);
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export function loadCartCounter() {
  let count = 0;
  const list = getLocalStorage("so-cart");
  if (Array.isArray(list) && list.length > 0) {
    list.forEach((product) => {
      count += product.count;
    });
  } else {
    count = 0;
  }
  document.querySelector(".cart-count").innerHTML = count;
}
export async function loadHeaderFooter() {
  const currentPage = document.URL;
  let initialPath = "";
  let notHome = false;

  if (
    currentPage.includes("admin") ||
    currentPage.includes("cart") ||
    currentPage.includes("checkedout") ||
    currentPage.includes("checkout") ||
    currentPage.includes("product_pages") ||
    currentPage.includes("product-listing")
  ) {
    initialPath = "../";
    notHome = true;
  }

  const header = await loadTemplate(`${initialPath}partials/header.html`);
  const footer = await loadTemplate(`${initialPath}partials/footer.html`);
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
  loadCartCounter();
  notHome && changeHeaderPath();
}

export function getTotal() {
  const cartProducts = getLocalStorage("so-cart");
  let totalAmount = 0;
  let totalInCart = 0;

  cartProducts.forEach((product) => {
    totalAmount += product.FinalPrice * product.count;
    totalInCart += product.count;
  });

  return [totalAmount, totalInCart];
}

export function totalToPage() {
  if (getLocalStorage("so-cart") == 0 || getLocalStorage("so-cart") == null) {
    document.querySelector(".cart-footer").classList.add("hide");
  } else {
    document.querySelector(".cart-footer").classList.remove("hide");

    const totalAmount = getTotal()[0];

    document.querySelector(".cart-total").innerHTML = `Total: $${parseFloat(
      totalAmount
    ).toFixed(2)}`;
  }
}

export function changeHeaderPath() {
  const logoLink = document.querySelector("#logo-link");
  const logoImg = document.querySelector("#logo-img");
  const cartLink = document.querySelector("#cart-link");

  logoLink.setAttribute("href", "../");
  logoImg.setAttribute("src", "../images/noun_Tent_2517.svg");
  cartLink.setAttribute("href", "../cart");
}
