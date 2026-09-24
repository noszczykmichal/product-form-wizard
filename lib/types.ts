import type { AnyFieldApi } from "@tanstack/react-form";
import type {
  CATEGORIES,
  MANUFACTURERS,
  FEATURES,
  CURRENCIES,
  VAT_VALUES,
} from "./constants";

export type Manufacturer = (typeof MANUFACTURERS)[number];
export type Category = (typeof CATEGORIES)[number];
export type Feature = (typeof FEATURES)[number];
export type Currency = (typeof CURRENCIES)[number];
export type VatRate = (typeof VAT_VALUES)[number];

interface ProductBase {
  productName: string;
  sku: string;
  description?: string;
  manufacturer: Manufacturer;
  category: Category;
  features: Feature[];
  netPrice: number;
  vatRate: VatRate;
  currency: Currency;
  available: boolean;
  maxCountBasket: number;
  minCountBasket: number;
}

type StockInfo =
  | { limited: true; stockQuantity: number }
  | { limited: false; stockQuantity?: never };

export type Product = ProductBase & StockInfo;

export interface FieldOption<T> {
  value: T;
  label: string;
}

export type NumberValidatorArgs = { value: number; fieldApi: AnyFieldApi };
