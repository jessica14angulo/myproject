var u = (c, e, t) => new Promise((r, o) => {
  var l = s => {
      try {
        n(t.next(s))
      } catch (a) {
        o(a)
      }
    },
    i = s => {
      try {
        n(t.throw(s))
      } catch (a) {
        o(a)
      }
    },
    n = s => s.done ? r(s.value) : Promise.resolve(s.value).then(l, i);
  n((t = t.apply(c, e)).next())
});
import {
  getLocalStorage as m,
  getTotal as h,
  setLocalStorage as d,
  renderWithTemplate as p
} from "./utils.js";
import y from "./externalServices.js";

function f(c) {
  const e = c.map(t => {
    const r = {};
    return r.id = t.Id, r.name = t.Name, r.price = t.FinalPrice, r.quantity = t.count, r
  });
  return e
}
export default class T {
  constructor(e) {
    this.key = e, this.list = [], this.numbOfItems = 0, this.itemTotal = 0, this.shipping = 0, this.tax = 0, this.orderTotal = 0
  }
  init() {
    this.list = m(this.key), this.subtotal(), document.querySelector("#checkout-form").addEventListener("submit", e => {
      e.preventDefault(), this.checkout(e.target)
    })
  }
  subtotal() {
    const [e, t] = h();
    this.numbOfItems = t, this.itemTotal = e, document.querySelector("#items-number").innerHTML = this.numbOfItems, document.querySelector(".cart-subtotal").innerHTML = `$${parseFloat(this.itemTotal).toFixed(2)}`, this.finalTotal()
  }
  finalTotal() {
    document.querySelector("#zip-code").addEventListener("change", () => {
      this.shipping = 10 + (this.numbOfItems - 1) * 2, this.tax = this.itemTotal * .06, this.orderTotal = this.itemTotal + this.shipping + this.tax, this.displayTotal()
    })
  }
  displayTotal() {
    document.querySelector("#shipping").innerHTML = `$${parseFloat(this.shipping).toFixed(2)}`, document.querySelector("#tax").innerHTML = `$${parseFloat(this.tax).toFixed(2)}`, document.querySelector("#final-total").innerHTML = `$${parseFloat(this.orderTotal).toFixed(2)}`
  }
  checkout(e) {
    return u(this, null, function* () {
      const t = new FormData(e),
        r = new Date,
        o = {},
        l = f(this.list);
      for (let i of t.keys()) o[i] = t.get(i);
      o.orderDate = r, o.items = l;
      try {
        const i = new y,
          n = yield i.checkout(o);
        d(this.key, []), document.getElementById("checkout-form").reset(), window.location.assign(`../checkedout/?orderID=${n.orderId}`)
      } catch (i) {
        const n = yield i.message;
        for (let s of Object.keys(n)) {
          const a = n[s];
          this.render(a)
        }
      }
    })
  }
  render(e) {
    const t = document.getElementById("checkout-alert"),
      r = document.querySelector(".parent-alert");
    p(t, r, e, this.prepareTemplate);
    const o = e.replace(/\s/g, "");
    document.querySelector(`.${o}`).addEventListener("click", () => {
      document.querySelector(`#${o}`).remove()
    })
  }
  prepareTemplate(e, t) {
    return e.querySelector(".error-type").innerHTML = t, e.querySelector(".alertparenttemplate").id = t.replace(/\s/g, ""), e.querySelector("#error-button").classList.add(t.replace(/\s/g, "")), e
  }
}
