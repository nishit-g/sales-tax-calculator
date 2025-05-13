import { ProductCategory, TaxRate } from "../utils/constants.js";

export class TaxCalculatorService {
  static calculateTax(product) {
    let taxRate = 0;

    if (!this._isExempt(product.category)) {
      taxRate += TaxRate.BASIC_SALES_TAX;
    }

    if (product.isImported) {
      taxRate += TaxRate.IMPORT_DUTY;
    }

    const taxAmount = this._roundUpToNearest0_05(product.price * taxRate);
    return taxAmount;
  }

  static _isExempt(category) {
    const exemptCategories = [
      ProductCategory.BOOK,
      ProductCategory.FOOD,
      ProductCategory.MEDICAL,
    ];

    return exemptCategories.includes(category);
  }

  static _roundUpToNearest0_05(value) {
    return Math.ceil(value * 20) / 20;
  }
}
