import { ProductCategory, CategoryKeywords } from "../utils/constants.js";

export class ProductCatalogService {
  static categorizeProduct(name) {
    const lowercaseName = name.toLowerCase();

    for (const [category, keywords] of Object.entries(CategoryKeywords)) {
      if (keywords.some((keyword) => lowercaseName.includes(keyword))) {
        return category;
      }
    }

    return ProductCategory.OTHER;
  }

  static isImported(description) {
    return description.toLowerCase().includes("imported");
  }

  static cleanProductName(description) {
    return description
      .replace(/imported /i, "")
      .replace(/ imported/i, "")
      .trim();
  }
}
