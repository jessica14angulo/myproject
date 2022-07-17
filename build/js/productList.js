var o = (c, e, r) => new Promise((i, s) => {
  var d = t => {
      try {
        a(r.next(t))
      } catch (n) {
        s(n)
      }
    },
    l = t => {
      try {
        a(r.throw(t))
      } catch (n) {
        s(n)
      }
    },
    a = t => t.done ? i(t.value) : Promise.resolve(t.value).then(d, l);
  a((r = r.apply(c, e)).next())
});
import {
  renderListWithTemplate as u
} from "./utils.js";
class m {
  constructor(e, r, i) {
    this.category = e, this.dataSource = r, this.element = i
  }
  init() {
    return o(this, null, function* () {
      const e = yield this.dataSource.getData(this.category);
      this.render(this.filter(e))
    })
  }
  filter(e) {
    return e.filter(r => e.indexOf(r) < 4)
  }
  render(e) {
    const r = document.getElementById("product-card-template");
    u(r, this.element, e, this.prepareTemplate)
  }
  prepareTemplate(e, r) {
    return e.querySelector("a").href += r.Id, e.querySelector("img").src = r.Images.PrimaryMedium, e.querySelector("img").alt += r.NameWithoutBrand, e.querySelector(".card__brand").innerHTML += r.Brand.Name, e.querySelector(".card__name").innerHTML += r.NameWithoutBrand, e.querySelector(".product-card__price").innerHTML += r.ListPrice, e
  }
}
export default m;
