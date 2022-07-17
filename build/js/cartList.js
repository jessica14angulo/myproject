var d = (o, e, t) =>
  new Promise((i, s) => {
    var a = (r) => {
        try {
          n(t.next(r));
        } catch (l) {
          s(l);
        }
      },
      c = (r) => {
        try {
          n(t.throw(r));
        } catch (l) {
          s(l);
        }
      },
      n = (r) => (r.done ? i(r.value) : Promise.resolve(r.value).then(a, c));
    n((t = t.apply(o, e)).next());
  });
import {
  renderListWithTemplate as m,
  getLocalStorage as g,
  setLocalStorage as h,
  loadCartCounter as u,
  totalToPage as y,
} from "./utils.js";
export default class S {
  constructor(e, t) {
    (this.key = e), (this.listElement = t), this.list;
  }
  init() {
    return d(this, null, function* () {
      const e = g(this.key);
      (this.list = e), this.reRender();
    });
  }
  reRender() {
    this.renderList(this.list);
    const e = document.querySelectorAll("#decrease"),
      t = document.querySelectorAll("#increase");
    let i = this;
    e.forEach((s) => {
      s.addEventListener("click", function (a) {
        const c = a.target.getAttribute("data-id");
        i.editQuantity("remove", c);
      });
    }),
      t.forEach((s) => {
        s.addEventListener("click", function (a) {
          const c = a.target.getAttribute("data-id");
          i.editQuantity("add", c);
        });
      });
  }
  editQuantity(e, t) {
    switch (e) {
      case "add":
        for (let i = 0; i < this.list.length; i++)
          this.list[i].Id == t && this.list[i].count++;
        h("so-cart", this.list), u(), y(), this.reRender();
        break;
      case "remove":
        for (let i = 0; i < this.list.length; i++)
          this.list[i].Id == t &&
            (this.list[i].count--,
            this.list[i].count <= 0 &&
              this.list.splice(this.list.indexOf(this.list[i]), 1));
        h("so-cart", this.list), u(), y(), this.reRender();
        break;
    }
  }
  prepareTemplate(e, t) {
    return (
      (e.querySelector(".cart-card__image img").src = t.Images.PrimaryMedium),
      (e.querySelector(".cart-card__image img").alt += t.Name),
      (e.querySelector(".card__name").textContent = t.Name),
      (e.querySelector(".cart-card__color").textContent =
        t.Colors[0].ColorName),
      e.querySelector("#decrease").setAttribute("data-id", t.Id),
      e.querySelector("#increase").setAttribute("data-id", t.Id),
      (e.querySelector(".cart-card__quantity").textContent = t.count),
      (e.querySelector(".cart-card__price").textContent += parseFloat(
        t.FinalPrice * t.count
      ).toFixed(2)),
      e
    );
  }
  renderList(e) {
    const t = document.querySelector("#cart-card-template");
    m(t, this.listElement, e, this.prepareTemplate);
  }
}
