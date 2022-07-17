import {
  setLocalStorage,
  getLocalStorage,
  loadCartCounter,
} from "../../src/js/utils";
class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductByID(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    const productList = getLocalStorage("so-cart");
    if (Array.isArray(productList)) {
      if (productList.length == 0) {
        const thisProduct = this.product;
        thisProduct["count"] = 1;

        const list = [...productList, thisProduct];
        setLocalStorage("so-cart", list);
      } else {
        let not = true;
        productList.forEach((product) => {
          if (product.Id == this.product.Id) {
            not = false;
            product.count++;
            setLocalStorage("so-cart", productList);
          }
        });
        if (not) {
          const thisProduct = this.product;
          thisProduct["count"] = 1;

          const list = [...productList, thisProduct];
          setLocalStorage("so-cart", list);
        }
      }
    } else {
      const thisProduct = this.product;
      thisProduct["count"] = 1;
      setLocalStorage("so-cart", [thisProduct]);
    }

    loadCartCounter();
  }

  renderProductDetails() {
    const template = document.getElementById("product-card-template");

    const clone = template.content.cloneNode(true);

    clone.querySelector(
      ".product-brand-name"
    ).innerHTML = this.product.Brand.Name;
    clone.querySelector(
      ".product-brand-name-no-brand"
    ).innerHTML = this.product.NameWithoutBrand;

    clone.querySelector(
      ".product-brand-image"
    ).src = this.product.Images.PrimaryLarge;
    clone.querySelector(".product-brand-image").alt += this.product.Name;
    clone.querySelector(
      ".product-card__price"
    ).innerHTML += this.product.ListPrice;

    clone.querySelector(
      ".product__color"
    ).innerHTML = this.product.Colors[0].ColorName;

    clone.querySelector("#addToCart").setAttribute("data-id", this.product.Id);

    document.querySelector(".product-container").appendChild(clone);
  }
}

export default ProductDetails;
