export const ProductCategory = Object.freeze({
  BOOK: "book",
  FOOD: "food",
  MEDICAL: "medical",
  OTHER: "other",
});

export const TaxRate = Object.freeze({
  BASIC_SALES_TAX: 0.1,
  IMPORT_DUTY: 0.05,
});

export const CategoryKeywords = Object.freeze({
  [ProductCategory.BOOK]: ["book"],
  [ProductCategory.FOOD]: ["chocolate", "chocolates", "food", "fruit", "bread"],
  [ProductCategory.MEDICAL]: [
    "pill",
    "pills",
    "medicine",
    "headache",
    "medical",
  ],
});
