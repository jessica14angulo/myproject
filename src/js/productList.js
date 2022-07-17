import { renderListWithTemplate } from "../js/utils.js";
class ProductDetails {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = element;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.render(this.filter(list));
  }

  filter(list) {
    return list.filter((product) => list.indexOf(product) < 4);
  }

  render(list) {
    const template = document.getElementById("product-card-template");
    renderListWithTemplate(template, this.element, list, this.prepareTemplate);
  }

  prepareTemplate(template, product) {
    template.querySelector("a").href += product.Id;
    template.querySelector("img").src = product.Images.PrimaryMedium;
    template.querySelector("img").alt += product.NameWithoutBrand;
    template.querySelector(".card__brand").innerHTML += product.Brand.Name;
    template.querySelector(".card__name").innerHTML += product.NameWithoutBrand;
    template.querySelector(".product-card__price").innerHTML +=
      product.ListPrice;

    return template;
  }
}

export default ProductDetails;
