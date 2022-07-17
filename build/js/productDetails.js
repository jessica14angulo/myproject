var u = (i, r, t) => new Promise((o, c) => {
  var n = e => {
      try {
        a(t.next(e))
      } catch (s) {
        c(s)
      }
    },
    l = e => {
      try {
        a(t.throw(e))
      } catch (s) {
        c(s)
      }
    },
    a = e => e.done ? o(e.value) : Promise.resolve(e.value).then(n, l);
  a((t = t.apply(i, r)).next())
});
import {
  setLocalStorage as d,
  getLocalStorage as p,
  loadCartCounter as h
} from "./utils.js";
class m {
  constructor(r, t) {
    this.productId = r, this.dataSource = t, this.product = {}
  }
  init() {
    return u(this, null, function* () {
      this.product = yield this.dataSource.findProductByID(this.productId), this.renderProductDetails(), document.getElementById("addToCart").addEventListener("click", this.addToCart.bind(this))
    })
  }
  addToCart() {
    const r = p("so-cart");
    if (Array.isArray(r))
      if (r.length == 0) {
        const t = this.product;
        t.count = 1;
        const o = [...r, t];
        d("so-cart", o)
      } else {
        let t = !0;
        if (r.forEach(o => {
            o.Id == this.product.Id && (t = !1, o.count++, d("so-cart", r))
          }), t) {
          const o = this.product;
          o.count = 1;
          const c = [...r, o];
          d("so-cart", c)
        }
      }
    else {
      const t = this.product;
      t.count = 1, d("so-cart", [t])
    }
    h()
  }
  renderProductDetails() {
    const r = document.getElementById("product-card-template"),
      t = r.content.cloneNode(!0);
    t.querySelector(".product-brand-name").innerHTML = this.product.Brand.Name, t.querySelector(".product-brand-name-no-brand").innerHTML = this.product.NameWithoutBrand, t.querySelector(".product-brand-image").src = this.product.Images.PrimaryLarge, t.querySelector(".product-brand-image").alt += this.product.Name, t.querySelector(".product-card__price").innerHTML += this.product.ListPrice, t.querySelector(".product__color").innerHTML = this.product.Colors[0].ColorName, t.querySelector("#addToCart").setAttribute("data-id", this.product.Id), document.querySelector(".product-container").appendChild(t)
  }
}
export default m;
