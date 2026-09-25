import type { ProductFormValues } from "@/lib/form/schema";

export const productDefaultValues = {
  productName: "",
  sku: "",
  description: "",
  manufacturer: "",
  category: "",
  features: [],
  netPrice: NaN,
  grossPrice: NaN,
  vatRate: 23,
  currency: "PLN",
  stockQuantity: NaN,
  available: true,
  limited: false,
  minCountBasket: 1,
  maxCountBasket: 10,
} satisfies ProductFormValues as ProductFormValues;
