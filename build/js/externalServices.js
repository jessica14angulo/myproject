var c = (a, e, t) => new Promise((o, n) => {
  var s = r => {
      try {
        h(t.next(r))
      } catch (p) {
        n(p)
      }
    },
    d = r => {
      try {
        h(t.throw(r))
      } catch (p) {
        n(p)
      }
    },
    h = r => r.done ? o(r.value) : Promise.resolve(r.value).then(s, d);
  h((t = t.apply(a, e)).next())
});
const u = "https://157.201.228.93:2992/";

function i(a) {
  if (a.ok) return a.json();
  throw {
    name: "servicesError",
    message: a.json()
  }
}
class y {
  constructor() {}
  getData(e) {
    return c(this, null, function* () {
      return fetch(u + e).then(i).then(t => t.Result)
    })
  }
  findProductByID(e) {
    return c(this, null, function* () {
      const t = yield this.getData(`product/${e}`);
      return t
    })
  }
  checkout(e) {
    return c(this, null, function* () {
      const t = "https://157.201.228.93:2992/checkout",
        o = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(e)
        },
        n = yield fetch(t, o), s = yield i(n);
      return s
    })
  }
  loginRequest(e) {
    return c(this, null, function* () {
      const t = "https://157.201.228.93:2992/login",
        o = {
          method: "POST",
          body: JSON.stringify(e),
          headers: {
            "Content-Type": "application/json"
          }
        },
        n = yield fetch(t, o), s = yield i(n);
      return s
    })
  }
  fetchOrders(e) {
    return c(this, null, function* () {
      const t = "https://157.201.228.93:2992/orders",
        o = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${e}`
          }
        },
        n = yield fetch(t, o), s = yield i(n);
      return s
    })
  }
}
export default y;
