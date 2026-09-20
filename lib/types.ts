import {
  CATEGORIES,
  MANUFACTURERS,
  FEATURES,
  CURRENCY,
  VAT_VALUES,
} from "./constants";

export type Manufacturer = (typeof MANUFACTURERS)[number];
export type Category = (typeof CATEGORIES)[number];
export type Feature = (typeof FEATURES)[number];
export type Currency = (typeof CURRENCY)[number];
export type VatRate = (typeof VAT_VALUES)[number];

interface ProductBase {
  name: string;
  sku: string;
  description?: string;
  manufacturer: Manufacturer;
  category: Category;
  features: Feature[];
  netPrice: number;
  vat: VatRate;
  currency: Currency;
  available: boolean;
  maxCountBasket: number;
  minCountBasket: number;
}

type StockInfo =
  | { limited: true; stockQuantity: number }
  | { limited: false; stockQuantity?: never };

export type Product = ProductBase & StockInfo;
