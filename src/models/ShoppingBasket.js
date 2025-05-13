export class ShoppingBasket {
  constructor() {
    this._items = [];
  }

  get items() {
    return this._items;
  }

  addItem(item) {
    this._items.push(item);
  }

  getTotalTax() {
    return this._items.reduce((total, item) => total + item.getTaxAmount(), 0);
  }

  getTotalPrice() {
    return this._items.reduce((total, item) => total + item.getFinalPrice(), 0);
  }

  generateReceipt() {
    const itemLines = this._items.map((item) => item.toReceiptLine());

    const taxLine = `Sales Taxes: ${this.getTotalTax().toFixed(2)}`;
    const totalLine = `Total: ${this.getTotalPrice().toFixed(2)}`;

    return [...itemLines, taxLine, totalLine].join("\n");
  }
}
