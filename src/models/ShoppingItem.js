import { TaxCalculatorService } from "../services/TaxCalculatorService.js";

export class ShoppingItem {
  constructor(product, quantity) {
    this._product = product;
    this._quantity = quantity;
  }

  get product() {
    return this._product;
  }

  get quantity() {
    return this._quantity;
  }

  getTotalPrice() {
    return this._quantity * this._product.price;
  }

  getTaxAmount() {
    return this._quantity * TaxCalculatorService.calculateTax(this._product);
  }

  getFinalPrice() {
    return this.getTotalPrice() + this.getTaxAmount();
  }

  getFormattedDescription() {
    const prefix = this._quantity > 1 ? `${this._quantity} ` : "";
    const imported = this._product.isImported ? "imported " : "";

    return `${prefix}${imported}${this._product.name}`;
  }

  toReceiptLine() {
    return `${this.getFormattedDescription()}: ${this.getFinalPrice().toFixed(2)}`;
  }
}
