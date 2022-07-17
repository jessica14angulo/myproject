var s = (t, e, o) =>
  new Promise((n, r) => {
    var a = (c) => {
        try {
          i(o.next(c));
        } catch (u) {
          r(u);
        }
      },
      l = (c) => {
        try {
          i(o.throw(c));
        } catch (u) {
          r(u);
        }
      },
      i = (c) => (c.done ? n(c.value) : Promise.resolve(c.value).then(a, l));
    i((o = o.apply(t, e)).next());
  });
function d(t) {
  if (t.ok) return t.text();
  throw new Error("Bad Response");
}
export function qs(t, e = document) {
  return e.querySelector(t);
}
export function getLocalStorage(t) {
  return JSON.parse(localStorage.getItem(t));
}
export function setLocalStorage(t, e) {
  localStorage.setItem(t, JSON.stringify(e));
}
export function setClick(t, e) {
  qs(t).addEventListener("touchend", (o) => {
    o.preventDefault(), e();
  }),
    qs(t).addEventListener("click", e);
}
export function getParams(t) {
  const e = window.location.search,
    o = new URLSearchParams(e),
    n = o.get(t);
  return n;
}
export function renderListWithTemplate(t, e, o, n) {
  (e.innerHTML = ""),
    o.forEach((r) => {
      const a = t.content.cloneNode(!0);
      e.appendChild(n(a, r));
    });
}
export function renderWithTemplate(t, e, o, n) {
  let r = t.content.cloneNode(!0);
  n && (r = n(r, o)), e.appendChild(r);
}
export function loadTemplate(t) {
  return s(this, null, function* () {
    const e = yield fetch(t).then(d),
      o = document.createElement("template");
    return (o.innerHTML = e), o;
  });
}
export function loadCartCounter() {
  let t = 0;
  const e = getLocalStorage("so-cart");
  Array.isArray(e) && e.length > 0
    ? e.forEach((o) => {
        t += o.count;
      })
    : (t = 0),
    (document.querySelector(".cart-count").innerHTML = t);
}
export function loadHeaderFooter() {
  return s(this, null, function* () {
    const t = document.URL;
    let e = "",
      o = !1;
    (t.includes("admin") ||
      t.includes("cart") ||
      t.includes("checkedout") ||
      t.includes("checkout") ||
      t.includes("product_pages") ||
      t.includes("product-listing")) &&
      ((e = "../"), (o = !0));
    const n = yield loadTemplate(`${e}partials/header.html`),
      r = yield loadTemplate(`${e}partials/footer.html`),
      a = document.getElementById("main-header"),
      l = document.getElementById("main-footer");
    renderWithTemplate(n, a),
      renderWithTemplate(r, l),
      loadCartCounter(),
      o && changeHeaderPath();
  });
}
export function getTotal() {
  const t = getLocalStorage("so-cart");
  let e = 0,
    o = 0;
  return (
    t.forEach((n) => {
      (e += n.FinalPrice * n.count), (o += n.count);
    }),
    [e, o]
  );
}
export function totalToPage() {
  if (getLocalStorage("so-cart") == 0 || getLocalStorage("so-cart") == null)
    document.querySelector(".cart-footer").classList.add("hide");
  else {
    document.querySelector(".cart-footer").classList.remove("hide");
    const t = getTotal()[0];
    document.querySelector(".cart-total").innerHTML = `Total: $${parseFloat(
      t
    ).toFixed(2)}`;
  }
}
export function changeHeaderPath() {
  const t = document.querySelector("#logo-link"),
    e = document.querySelector("#logo-img"),
    o = document.querySelector("#cart-link");
  t.setAttribute("href", "../"),
    e.setAttribute("src", "../images/noun_Tent_2517.svg"),
    o.setAttribute("href", "../cart");
}
