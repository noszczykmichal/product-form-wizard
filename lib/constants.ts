import type { Product, FieldOption, Manufacturer, Feature } from "./types";

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

const CURRENCY = ["£", "$", "PLN"] as const;

const VAT_VALUES = [0, 5, 8, 23] as const;

const PAGE_SIZE = 5;

const mockProducts: Product[] = [
  {
    name: "MacBook Pro 14''",
    sku: "MBP14M3PRO",
    manufacturer: "Apple",
    category: "Komputery",
    features: ["Bluetooth", "Premium", "USB-C", "WiFI"],
    netPrice: 8129.27,
    vat: 23,
    currency: "PLN",
    available: true,
    maxCountBasket: 1,
    minCountBasket: 5,
    limited: false,
  },
  {
    name: "Galaxy S24 Ultra",
    sku: "SGS24U256",
    manufacturer: "Samsung",
    category: "Telefony",
    features: ["Bluetooth", "Premium", "USB-C", "WiFI"],
    netPrice: 5121.14,
    vat: 23,
    currency: "PLN",
    available: true,
    maxCountBasket: 1,
    minCountBasket: 10,
    limited: true,
    stockQuantity: 45,
  },
  {
    name: "Sony WH-1000XM5",
    sku: "SNWH1000XM5",
    manufacturer: "Sony",
    category: "RTV",
    features: ["Bluetooth", "USB-C"],
    netPrice: 1300,
    vat: 23,
    currency: "PLN",
    available: true,
    maxCountBasket: 1,
    minCountBasket: 4,
    limited: false,
  },
  {
    name: "Bosch Serie 6 WAU28P40",
    sku: "BSWAU28P40",
    manufacturer: "Bosch",
    category: "AGD",
    features: ["Ekologiczny"],
    netPrice: 2682.11,
    vat: 23,
    currency: "PLN",
    available: false,
    maxCountBasket: 1,
    minCountBasket: 2,
    limited: true,
    stockQuantity: 0,
  },
  {
    name: "Xiaomi Smart Band 8",
    sku: "XMSB8BLK",
    manufacturer: "Xiaomi",
    category: "Akcesoria",
    features: ["Bezprzewodowy", "Bluetooth"],
    netPrice: 145.53,
    vat: 23,
    currency: "PLN",
    available: true,
    maxCountBasket: 1,
    minCountBasket: 10,
    limited: false,
  },
  {
    name: "Xiaomi Smart Band 8",
    sku: "XMSB8BLK1",
    manufacturer: "Xiaomi",
    category: "Akcesoria",
    features: ["Bezprzewodowy", "Bluetooth"],
    netPrice: 145.53,
    vat: 23,
    currency: "PLN",
    available: true,
    maxCountBasket: 1,
    minCountBasket: 10,
    limited: false,
  },
  {
    name: "Xiaomi Smart Band 8",
    sku: "XMSB8BLK2",
    manufacturer: "Xiaomi",
    category: "Akcesoria",
    features: ["Bezprzewodowy", "Bluetooth"],
    netPrice: 145.53,
    vat: 23,
    currency: "PLN",
    available: true,
    maxCountBasket: 1,
    minCountBasket: 10,
    limited: false,
  },
  {
    name: "Xiaomi Smart Band 8",
    sku: "XMSB8BLK3",
    manufacturer: "Xiaomi",
    category: "Akcesoria",
    features: ["Bezprzewodowy", "Bluetooth"],
    netPrice: 145.53,
    vat: 23,
    currency: "PLN",
    available: true,
    maxCountBasket: 1,
    minCountBasket: 10,
    limited: false,
  },
  {
    name: "Xiaomi Smart Band 8",
    sku: "XMSB8BLK4",
    manufacturer: "Xiaomi",
    category: "Akcesoria",
    features: ["Bezprzewodowy", "Bluetooth"],
    netPrice: 145.53,
    vat: 23,
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

const featuresOptions: FieldOption<Feature>[] = FEATURES.map((f) => ({
  value: f,
  label: f,
}));

export {
  TABLE_HEADERS,
  MANUFACTURERS,
  CATEGORIES,
  FEATURES,
  CURRENCY,
  VAT_VALUES,
  PAGE_SIZE,
  mockProducts,
  manufacturerOptions,
  featuresOptions,
};
