import { NumberValidatorArgs } from "@/lib/types";
import { stockSchema, step3Shape } from "@/lib/form/schema";

const toError = (message?: string) => (message ? { message } : undefined);

export const validateStock = ({ value, fieldApi }: NumberValidatorArgs) => {
  if (!fieldApi.form.getFieldValue("limited")) return undefined;
  return toError(stockSchema.safeParse(value).error?.issues[0]?.message);
};

export const validateMaxCountBasket = ({
  value,
  fieldApi,
}: NumberValidatorArgs) => {
  const base = step3Shape.maxCountBasket.safeParse(value);
  if (!base.success) return toError(base.error.issues[0]?.message);

  const min = fieldApi.form.getFieldValue("minCountBasket");
  if (!Number.isNaN(min) && value < min)
    return toError("Maksymalna ilość nie może być mniejsza niż minimalna.");

  return undefined;
};
