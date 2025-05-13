# Sales Tax Calculator

A JavaScript implementation of a sales tax calculator for Aisle Problem statement

## Problem Statement

This application calculates sales tax for shopping baskets according to these rules:

- Basic sales tax: 10% on all goods except books, food, and medical products (exempt)
- Import duty: Additional 5% on all imported goods with no exemptions
- Sales tax is rounded up to the nearest 0.05

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/sales-tax-calculator.git
cd sales-tax-calculator

# Install dependencies
npm install
```

### Demo

<div align="center">
  <a href="https://github.com/nishit-g/sales-tax-calculator/blob/main/aisle-demo.cast?raw=true" download>
    <img src="https://asciinema.org/a/404275.svg" width="720"/>
  </a>
  <p><i>Click to download the terminal demo (view with <a href="https://asciinema.org/docs/installation">Asciinema player</a>)</i></p>
</div>

<details>
  <summary>How to view the demo</summary>

1. Download the `.cast` file by clicking the image above
2. Install Asciinema if you don't have it:

   ```bash
   # MacOS
   brew install asciinema

   # Ubuntu/Debian
   sudo apt install asciinema

   # Other options at https://asciinema.org/docs/installation
   ```

3. Play the demo:
`bash
     asciinema play aisle-demo.cast
     `
</details>

## Usage

### Code Usage: how to use in code if needed

```javascript
import { Product, ShoppingItem, ShoppingBasket } from "./src/models";
import { ProductCategory } from "./src/utils/constants";

// Create a product
const book = new Product("book", 12.49, false, ProductCategory.BOOK);
const musicCD = new Product("music CD", 14.99, false, ProductCategory.OTHER);

// Create a basket
const basket = new ShoppingBasket();
basket.addItem(new ShoppingItem(book, 1));
basket.addItem(new ShoppingItem(musicCD, 1));

// Generate receipt
console.log(basket.generateReceipt());
```

### Interactive Mode

Start the interactive CLI:

```bash
# Using npm script
npm run interactive
```

The interactive mode lets you:

- Add items to your basket (choose from common items or add custom ones)
- View your current basket
- Generate a receipt with tax calculations
- Load example baskets
- Clear the basket

## Examples

### Input 1

```
1 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85
```

### Output 1

```
1 book: 12.49
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 29.83
```

## Project Structure

```

sales-tax-calculator/
├── bin/ # CLI executable scripts
├── examples/ # Example input files
├── src/
│ ├── models/ # Data models
│ ├── services/ # Business logic services
│ ├── utils/ # Utility functions and constants
│ ├── app.js # Main application
│ └── interactive.js # Interactive CLI
├── tests/ # Tests are hrer
├── index.js # Main entry poit
├── start-interactive.js # Interactive mode launcher
└── README.md

```

## Key Classes

- `Product`: Represents a product with its properties (name, price, category, import status)
- `ShoppingItem`: Handles a product with its quantity
- `ShoppingBasket`: Manages a collection of shopping items
- `TaxCalculatorService`: Calculates taxes with appropriate rounding
- `ProductCatalogService`: Categorizes products and detects import status
- `InputParser`: Processes input strings into data structures
- `InteractiveCLI`: Provides the interactive user interface

## Testing

Run tests with:

```bash
npm test
```

Tests cover:

- Unit tests for all components
