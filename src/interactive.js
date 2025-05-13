import inquirer from "inquirer";
import chalk from "chalk";
import { Product } from "./models/Product.js";
import { ShoppingItem } from "./models/ShoppingItem.js";
import { ShoppingBasket } from "./models/ShoppingBasket.js";
import { ProductCategory } from "./utils/constants.js";

class InteractiveCLI {
  constructor() {
    this.basket = new ShoppingBasket();
    this.productCategories = [
      { name: "Book", value: ProductCategory.BOOK },
      { name: "Food", value: ProductCategory.FOOD },
      { name: "Medical", value: ProductCategory.MEDICAL },
      { name: "Other", value: ProductCategory.OTHER },
    ];

    this.commonItems = [
      { name: "Book", category: ProductCategory.BOOK },
      { name: "Music CD", category: ProductCategory.OTHER },
      { name: "Chocolate bar", category: ProductCategory.FOOD },
      { name: "Bottle of perfume", category: ProductCategory.OTHER },
      { name: "Box of chocolates", category: ProductCategory.FOOD },
      { name: "Headache pills", category: ProductCategory.MEDICAL },
    ];
  }

  async start() {
    console.log("Starting interactive CLI...");

    try {
      console.clear();
      console.log(chalk.green.bold("=== Interactive Sales Tax Calculator ==="));
      console.log(
        chalk.blue(
          "Build your shopping basket and get your receipt with taxes calculated\n",
        ),
      );

      await this.showMainMenu();
    } catch (error) {
      console.error("Error in interactive CLI start:", error);
    }
  }

  async showMainMenu() {
    try {
      console.log("Showing main menu...");

      const answer = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: [
            { name: "Add an item to basket", value: "add" },
            { name: "View current basket", value: "view" },
            { name: "Generate receipt", value: "receipt" },
            { name: "Start with an example basket", value: "example" },
            { name: "Clear basket", value: "clear" },
            { name: "Exit", value: "exit" },
          ],
        },
      ]);

      console.log(`Selected action: ${answer.action}`);

      switch (answer.action) {
        case "add":
          await this.addItemWorkflow();
          break;
        case "view":
          this.viewBasket();
          break;
        case "receipt":
          this.generateReceipt();
          break;
        case "example":
          await this.loadExampleBasket();
          break;
        case "clear":
          this.clearBasket();
          break;
        case "exit":
          console.log(
            chalk.blue("Thank you for using the Sales Tax Calculator!"),
          );
          process.exit(0);
          break;
      }

      await this.showMainMenu();
    } catch (error) {
      console.error("Error in main menu:", error);
    }
  }

  async addItemWorkflow() {
    try {
      console.log(chalk.yellow("\nAdd an item to your basket:"));

      const { itemType } = await inquirer.prompt([
        {
          type: "list",
          name: "itemType",
          message: "Would you like to:",
          choices: [
            { name: "Select from common items", value: "common" },
            { name: "Add a custom item", value: "custom" },
          ],
        },
      ]);

      let itemName, category;

      if (itemType === "common") {
        const { selectedItem } = await inquirer.prompt([
          {
            type: "list",
            name: "selectedItem",
            message: "Select an item:",
            choices: this.commonItems.map((item) => ({
              name: item.name,
              value: item,
            })),
          },
        ]);

        itemName = selectedItem.name;
        category = selectedItem.category;
      } else {
        const answers = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Enter the item name:",
            validate: (input) =>
              input.trim() !== "" ? true : "Item name cannot be empty",
          },
          {
            type: "list",
            name: "category",
            message: "Select the item category:",
            choices: this.productCategories,
          },
        ]);

        itemName = answers.name;
        category = answers.category;
      }

      const itemDetails = await inquirer.prompt([
        {
          type: "number",
          name: "price",
          message: "Enter the price:",
          validate: (input) =>
            input > 0 ? true : "Price must be greater than 0",
        },
        {
          type: "number",
          name: "quantity",
          message: "Enter the quantity:",
          default: 1,
          validate: (input) =>
            input > 0 ? true : "Quantity must be greater than 0",
        },
        {
          type: "confirm",
          name: "isImported",
          message: "Is this item imported?",
          default: false,
        },
      ]);

      const product = new Product(
        itemName,
        itemDetails.price,
        itemDetails.isImported,
        category,
      );

      const item = new ShoppingItem(product, itemDetails.quantity);
      this.basket.addItem(item);

      console.log(
        chalk.green(
          `\n✓ Added ${itemDetails.quantity} ${itemDetails.isImported ? "imported " : ""}${itemName} to your basket`,
        ),
      );
    } catch (error) {
      console.error("Error in add item workflow:", error);
    }
  }

  viewBasket() {
    try {
      console.log(chalk.yellow("\nCurrent Basket:"));

      if (this.basket.items.length === 0) {
        console.log(chalk.gray("  Your basket is empty"));
        return;
      }

      this.basket.items.forEach((item, index) => {
        const product = item.product;
        console.log(
          chalk.white(
            `  ${index + 1}. ${item.quantity} ${product.isImported ? "imported " : ""}${product.name} at ${product.price.toFixed(2)}`,
          ),
        );
      });

      console.log(chalk.blue(`\n  Total items: ${this.basket.items.length}`));
    } catch (error) {
      console.error("Error in view basket:", error);
    }
  }

  generateReceipt() {
    try {
      console.log(chalk.yellow("\nReceipt:"));

      if (this.basket.items.length === 0) {
        console.log(chalk.gray("  Your basket is empty"));
        return;
      }

      const receipt = this.basket.generateReceipt();
      const receiptLines = receipt.split("\n");

      receiptLines.forEach((line) => {
        if (line.startsWith("Sales Taxes:")) {
          console.log(chalk.blue(`  ${line}`));
        } else if (line.startsWith("Total:")) {
          console.log(chalk.green.bold(`  ${line}`));
        } else {
          console.log(chalk.white(`  ${line}`));
        }
      });
    } catch (error) {
      console.error("Error in generate receipt:", error);
    }
  }

  async loadExampleBasket() {
    try {
      const { example } = await inquirer.prompt([
        {
          type: "list",
          name: "example",
          message: "Select an example:",
          choices: [
            { name: "Example 1: Book, Music CD, Chocolate bar", value: 1 },
            { name: "Example 2: Imported chocolates and perfume", value: 2 },
            {
              name: "Example 3: Mixed basket with imported and local items",
              value: 3,
            },
          ],
        },
      ]);

      this.clearBasket();

      switch (example) {
        case 1:
          this.loadExample1();
          break;
        case 2:
          this.loadExample2();
          break;
        case 3:
          this.loadExample3();
          break;
      }

      console.log(chalk.green("\n✓ Example basket loaded successfully"));
    } catch (error) {
      console.error("Error in load example basket:", error);
    }
  }

  loadExample1() {
    const book = new Product("book", 12.49, false, ProductCategory.BOOK);
    const cd = new Product("music CD", 14.99, false, ProductCategory.OTHER);
    const chocolate = new Product(
      "chocolate bar",
      0.85,
      false,
      ProductCategory.FOOD,
    );

    this.basket.addItem(new ShoppingItem(book, 1));
    this.basket.addItem(new ShoppingItem(cd, 1));
    this.basket.addItem(new ShoppingItem(chocolate, 1));
  }

  loadExample2() {
    const chocolates = new Product(
      "box of chocolates",
      10.0,
      true,
      ProductCategory.FOOD,
    );
    const perfume = new Product(
      "bottle of perfume",
      47.5,
      true,
      ProductCategory.OTHER,
    );

    this.basket.addItem(new ShoppingItem(chocolates, 1));
    this.basket.addItem(new ShoppingItem(perfume, 1));
  }

  loadExample3() {
    const importedPerfume = new Product(
      "bottle of perfume",
      27.99,
      true,
      ProductCategory.OTHER,
    );
    const perfume = new Product(
      "bottle of perfume",
      18.99,
      false,
      ProductCategory.OTHER,
    );
    const pills = new Product(
      "packet of headache pills",
      9.75,
      false,
      ProductCategory.MEDICAL,
    );
    const importedChocolates = new Product(
      "box of chocolates",
      11.25,
      true,
      ProductCategory.FOOD,
    );

    this.basket.addItem(new ShoppingItem(importedPerfume, 1));
    this.basket.addItem(new ShoppingItem(perfume, 1));
    this.basket.addItem(new ShoppingItem(pills, 1));
    this.basket.addItem(new ShoppingItem(importedChocolates, 1));
  }

  clearBasket() {
    try {
      this.basket = new ShoppingBasket();
      console.log(chalk.green("\n✓ Basket cleared"));
    } catch (error) {
      console.error("Error in clear basket:", error);
    }
  }
}

export { InteractiveCLI };
