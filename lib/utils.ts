export { cn } from "cn";

import { VatRate, Currency } from "./types";

const CURRENCY_CODE: Record<Currency, string> = {
  PLN: "PLN",
  $: "USD",
  "£": "GBP",
};

export function formatGrossPrice(
  netPrice: number,
  vat: VatRate,
  currency: Currency,
): string {
  const gross = netPrice * (1 + vat / 100);

  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: CURRENCY_CODE[currency],
    currencyDisplay: "code",
  }).format(gross);
}
