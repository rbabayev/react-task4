import { MainView } from "./../view/mainView";
import { MainModel } from "./../model/mainModel";

export class MainController {
  model: MainModel;
  view: MainView;

  constructor(model: MainModel, view: MainView) {
    this.model = model;
    this.view = view;

    this.view.bindGetProductsByType(this.getProductsByType.bind(this));
    this.view.bindFilterProductsBy(this.filterProductsBy.bind(this));

    this.initialize();
  }

  private async initialize() {
    await this.model.initializeProducts();
    await this.view.writeProductSubSection(this.model.products);
  }

  private async getProductsByType(type: string): Promise<void> {
    const filteredProducts = await this.model.getProductsByType(type);
    await this.view.writeProductSubSection(filteredProducts);
  }

  private async filterProductsBy(filterParam: string): Promise<void> {
    const filteredProducts = this.model.productFiltering(filterParam);
    await this.view.writeProductSubSection(filteredProducts);
  }
}
