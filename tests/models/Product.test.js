import { Product } from "../../src/models/Product.js";
import { ProductCategory } from "../../src/utils/constants.js";

describe("Product", () => {
  test("should create a product with correct properties", () => {
    const product = new Product("book", 12.49, false, ProductCategory.BOOK);

    expect(product.name).toBe("book");
    expect(product.price).toBe(12.49);
    expect(product.isImported).toBe(false);
    expect(product.category).toBe(ProductCategory.BOOK);
  });

  test("should default to non-imported if not specified", () => {
    const product = new Product("book", 12.49);
    expect(product.isImported).toBe(false);
  });

  test("should default to OTHER category if not specified", () => {
    const product = new Product("something", 10.0);
    expect(product.category).toBe(ProductCategory.OTHER);
  });

  test("should correctly format string representation with imported flag", () => {
    const importedProduct = new Product("perfume", 27.99, true);
    expect(importedProduct.toString()).toBe("imported perfume");

    const regularProduct = new Product("book", 12.49, false);
    expect(regularProduct.toString()).toBe("book");
  });
});
