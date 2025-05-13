import { ProductCategory } from "../utils/constants.js";

export class Product {
  constructor(
    name,
    price,
    isImported = false,
    category = ProductCategory.OTHER,
  ) {
    this._name = name;
    this._price = price;
    this._isImported = isImported;
    this._category = category;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  get isImported() {
    return this._isImported;
  }

  get category() {
    return this._category;
  }

  toString() {
    return `${this._isImported ? "imported " : ""}${this._name}`;
  }
}
