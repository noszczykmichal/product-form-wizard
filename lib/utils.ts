export { cn } from "cn";
import type { AnyFieldApi } from "@tanstack/react-form";
import { VatRate, Currency } from "@/lib/types";

export function formatGrossPrice(
  netPrice: number,
  vat: VatRate,
  currency: Currency,
): string {
  const gross = netPrice * (1 + vat / 100);

  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
    currencyDisplay: "code",
  }).format(gross);
}

export const clearBlurError = (field: AnyFieldApi) => {
  if (!field.state.meta.errorMap.onBlur) return;
  field.setMeta((m) => ({
    ...m,
    errorMap: { ...m.errorMap, onBlur: undefined },
  }));
};
