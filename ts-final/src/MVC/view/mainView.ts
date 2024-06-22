import { Product } from "./../../data/product/product";

export class MainView {
  public app: HTMLDivElement;
  private getProductsByType: (type: string) => Promise<void>;
  private filterProductsBy: (filterParam: string) => Promise<void>;

  constructor() {
    this.app = document.querySelector("#app") as HTMLDivElement;
    this.getProductsByType = async () => {};
    this.filterProductsBy = async () => {};
    this.initialize();
  }

  private initialize(): void {
    this.addEventsToSubscribeSection();
  }

  public async writeProductSubSection(products: Product[]): Promise<void> {
    const subscribeList = this.clearSubscribeList();
    products.forEach((product) => {
      const productItem = this.createProductItem(product);
      subscribeList.appendChild(productItem);
    });
  }

  public bindGetProductsByType(handler: (type: string) => Promise<void>): void {
    this.getProductsByType = handler;
  }

  public bindFilterProductsBy(
    handler: (filterParam: string) => Promise<void>
  ): void {
    this.filterProductsBy = handler;
  }

  private addEventsToSubscribeSection(): void {
    this.addLinkEvents();
    this.addFilterEvent();
  }

  private addLinkEvents(): void {
    const links = Array.from(
      document.querySelectorAll(".subscribe__links li a")
    );
    links.forEach((link) => {
      link.addEventListener("click", this.handleLinkClick.bind(this));
    });
  }

  private addFilterEvent(): void {
    const filterButton = document.querySelector(
      ".subscribe__filter"
    ) as HTMLSelectElement;
    filterButton.addEventListener("change", this.handleFilterChange.bind(this));
  }

  private async handleLinkClick(event: Event): Promise<void> {
    event.preventDefault();
    const element = event.currentTarget as HTMLAnchorElement;
    await this.getProductsByType(element.textContent as string);
  }

  private async handleFilterChange(event: Event): Promise<void> {
    const select = event.currentTarget as HTMLSelectElement;
    const selectedItemText =
      select.options[select.selectedIndex].textContent?.toLowerCase() ?? "";
    await this.filterProductsBy(selectedItemText);
  }

  private clearSubscribeList(): HTMLElement {
    const subscribeList = document.querySelector(
      ".subscribe__products"
    ) as HTMLElement;
    subscribeList.innerHTML = "";
    return subscribeList;
  }

  private createProductItem(product: Product): HTMLElement {
    const item = document.createElement("li");
    item.className = "product";

    const img = document.createElement("img");
    img.className = "product__image";
    img.src = product.imgPath;
    img.alt = product.name;
    item.appendChild(img);

    const fullname = document.createElement("a");
    fullname.className = "product__fullname";
    fullname.textContent = product.name;
    item.appendChild(fullname);

    const typePriceDiv = document.createElement("div");
    typePriceDiv.className = "product__type-price";

    const type = document.createElement("p");
    type.className = "product__type";
    type.textContent = product.type;
    typePriceDiv.appendChild(type);

    const price = document.createElement("p");
    price.className = "product__price";
    price.textContent = product.price;
    typePriceDiv.appendChild(price);

    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.textContent = "Add";
    addButton.style.border = "1px solid black";
    addButton.addEventListener("click", () => {
      const shoppingCart = document.querySelector(".shopping") as HTMLElement;
      const cartPrice = document.createElement("p");
      cartPrice.textContent = `Cart: ${product.price}`;
      shoppingCart.appendChild(cartPrice);
    });
    item.appendChild(addButton);

    return item;
  }
}
