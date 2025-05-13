import { Product } from "../models/Product.js";
import { ShoppingItem } from "../models/ShoppingItem.js";
import { ShoppingBasket } from "../models/ShoppingBasket.js";
import { ProductCatalogService } from "../services/ProductCatalogService.js";

export class InputParser {
  static parseInput(input) {
    const basket = new ShoppingBasket();
    const lines = input.trim().split("\n");
    const lineRegex = /^(\d+) (.*) at (\d+\.\d+)$/;

    lines.forEach((line) => {
      const match = line.match(lineRegex);

      if (match) {
        const quantity = parseInt(match[1], 10);
        const description = match[2];
        const price = parseFloat(match[3]);

        const isImported = ProductCatalogService.isImported(description);

        const productName = ProductCatalogService.cleanProductName(description);

        const category = ProductCatalogService.categorizeProduct(productName);

        const product = new Product(productName, price, isImported, category);
        const item = new ShoppingItem(product, quantity);

        basket.addItem(item);
      } else {
        console.error(`Invalid input line: ${line}`);
      }
    });

    return basket;
  }
}
