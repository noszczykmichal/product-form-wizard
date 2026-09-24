import type {
  Product,
  FieldOption,
  Manufacturer,
  Feature,
  Category,
  Currency,
  VatRate,
} from "./types";

const TABLE_HEADERS = [
  "Nazwa",
  "SKU",
  "Kategoria",
  "Cena Brutto",
  "Status",
  "Magazyn",
] as const;

const MANUFACTURERS = ["Apple", "Samsung", "Sony", "Bosch", "Xiaomi"] as const;

const CATEGORIES = [
  "Komputery",
  "Telefony",
  "RTV",
  "AGD",
  "Akcesoria",
] as const;

const FEATURES = [
  "Bluetooth",
  "WiFI",
  "USB-C",
  "Wodoodporny",
  "Bezprzewodowy",
  "Ekologiczny",
  "Premium",
] as const;

const CURRENCIES = ["GBP", "USD", "PLN"] as const;

const VAT_VALUES = [0, 5, 8, 23] as const;

const PAGE_SIZE = 5;

const mockProducts: Product[] = [
  {
    productName: "MacBook Pro 14''",
    sku: "MBP14M3PRO",
    manufacturer: "Apple",
    category: "Komputery",
    features: ["Bluetooth", "Premium", "USB-C", "WiFI"],
    netPrice: 8129.27,
    vatRate: 23,
    currency: "PLN",
    available: true,
    maxCountBasket: 1,
    minCountBasket: 5,
    limited: false,
  },
  {
    productName: "Galaxy S24 Ultra",
    sku: "SGS24U256",
    manufacturer: "Samsung",
    category: "Telefony",
    features: ["Bluetooth", "Premium", "USB-C", "WiFI"],
    netPrice: 5121.14,
    vatRate: 23,
    currency: "PLN",
    available: true,
    maxCountBasket: 1,
    minCountBasket: 10,
    limited: true,
    stockQuantity: 45,
  },
  {
    productName: "Sony WH-1000XM5",
    sku: "SNWH1000XM5",
    manufacturer: "Sony",
    category: "RTV",
    features: ["Bluetooth", "USB-C"],
    netPrice: 1300,
    vatRate: 23,
    currency: "PLN",
    available: true,
    maxCountBasket: 1,
    minCountBasket: 4,
    limited: false,
  },
  {
    productName: "Bosch Serie 6 WAU28P40",
    sku: "BSWAU28P40",
    manufacturer: "Bosch",
    category: "AGD",
    features: ["Ekologiczny"],
    netPrice: 2682.11,
    vatRate: 23,
    currency: "PLN",
    available: false,
    maxCountBasket: 1,
    minCountBasket: 2,
    limited: true,
    stockQuantity: 0,
  },
  {
    productName: "Xiaomi Smart Band 8",
    sku: "XMSB8BLK",
    manufacturer: "Xiaomi",
    category: "Akcesoria",
    features: ["Bezprzewodowy", "Bluetooth"],
    netPrice: 145.53,
    vatRate: 23,
    currency: "PLN",
    available: true,
    maxCountBasket: 1,
    minCountBasket: 10,
    limited: false,
  },
];

const manufacturerOptions: FieldOption<Manufacturer>[] = MANUFACTURERS.map(
  (m) => ({
    value: m,
    label: m,
  }),
);

const categoryOptions: FieldOption<Category>[] = CATEGORIES.map((c) => ({
  value: c,
  label: c,
}));

const featuresOptions: FieldOption<Feature>[] = FEATURES.map((f) => ({
  value: f,
  label: f,
}));

const vatRatesOptions: FieldOption<VatRate>[] = VAT_VALUES.map((r) => ({
  value: r,
  label: `${r}%`,
}));

const currenciesOptions: FieldOption<Currency>[] = CURRENCIES.map((c) => ({
  value: c,
  label: c,
}));

export {
  TABLE_HEADERS,
  MANUFACTURERS,
  CATEGORIES,
  FEATURES,
  CURRENCIES,
  VAT_VALUES,
  PAGE_SIZE,
  mockProducts,
  manufacturerOptions,
  categoryOptions,
  featuresOptions,
  vatRatesOptions,
  currenciesOptions,
};
