import { TaxCalculatorService } from "../../src/services/TaxCalculatorService.js";
import { Product } from "../../src/models/Product.js";
import { ProductCategory } from "../../src/utils/constants.js";

describe("TaxCalculatorService", () => {
  test("should calculate zero tax for exempt non-imported items", () => {
    const book = new Product("book", 12.49, false, ProductCategory.BOOK);
    expect(TaxCalculatorService.calculateTax(book)).toBe(0);

    const food = new Product("chocolate", 0.85, false, ProductCategory.FOOD);
    expect(TaxCalculatorService.calculateTax(food)).toBe(0);

    const medical = new Product(
      "headache pills",
      9.75,
      false,
      ProductCategory.MEDICAL,
    );
    expect(TaxCalculatorService.calculateTax(medical)).toBe(0);
  });

  test("should calculate import duty only for exempt imported items", () => {
    const importedBook = new Product("book", 12.49, true, ProductCategory.BOOK);
    expect(TaxCalculatorService.calculateTax(importedBook)).toBe(0.65);

    const importedChocolate = new Product(
      "box of chocolates",
      10.0,
      true,
      ProductCategory.FOOD,
    );
    expect(TaxCalculatorService.calculateTax(importedChocolate)).toBe(0.5);
  });

  test("should calculate basic sales tax for non-exempt non-imported items", () => {
    const cd = new Product("music CD", 14.99, false, ProductCategory.OTHER);
    expect(TaxCalculatorService.calculateTax(cd)).toBe(1.5);
  });

  test("should calculate both taxes for non-exempt imported items", () => {
    const importedPerfume = new Product(
      "bottle of perfume",
      47.5,
      true,
      ProductCategory.OTHER,
    );
    expect(TaxCalculatorService.calculateTax(importedPerfume)).toBe(7.15);
  });

  test("should round up to nearest 0.05", () => {
    expect(TaxCalculatorService._roundUpToNearest0_05(1.01)).toBe(1.05);
    expect(TaxCalculatorService._roundUpToNearest0_05(1.05)).toBe(1.05);
    expect(TaxCalculatorService._roundUpToNearest0_05(1.06)).toBe(1.1);
    expect(TaxCalculatorService._roundUpToNearest0_05(1.51)).toBe(1.55);
    expect(TaxCalculatorService._roundUpToNearest0_05(1.52)).toBe(1.55);
  });
});
