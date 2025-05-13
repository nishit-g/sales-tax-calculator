import { InputParser } from "./utils/InputParser.js";

export class SalesTaxApp {
  static processInput(input) {
    const basket = InputParser.parseInput(input);
    return basket.generateReceipt();
  }

  static runTests() {
    const inputs = [
      `1 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85`,

      `1 imported box of chocolates at 10.00
1 imported bottle of perfume at 47.50`,

      `1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
1 box of imported chocolates at 11.25`,
    ];

    inputs.forEach((input, index) => {
      console.log(`\nOutput ${index + 1}:`);
      console.log(SalesTaxApp.processInput(input));
    });
  }
}

if (typeof require !== "undefined" && require.main === module) {
  SalesTaxApp.runTests();
}
