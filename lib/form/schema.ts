import * as z from "zod";
import {
  CATEGORIES,
  CURRENCIES,
  FEATURES,
  MANUFACTURERS,
  VAT_VALUES,
} from "../constants";

export const step1Schema = z.object({
  productName: z
    .string()
    .trim()
    .min(1, { error: "Nazwa produktu jest wymagana.", abort: true })
    .min(3, "Nazwa produktu nie może być krótsza niż 3 znaki."),
  sku: z
    .string()
    .trim()
    .min(1, { error: "SKU produktu jest wymagany.", abort: true })
    .max(24, "SKU produktu nie może być dłuższe niż 24 znaki.")
    .regex(/^[a-zA-Z0-9]+$/, "SKU może zawierać tylko litery i cyfry."),
  description: z.string().trim(),
  manufacturer: z.enum(MANUFACTURERS, { error: "Wybierz producenta." }),
  category: z.enum(CATEGORIES, { error: "Wybierz kategorię." }),
  features: z
    .array(z.enum(FEATURES))
    .min(1, "Wybierz co najmniej jedną cechę."),
});

export const step2Schema = z.object({
  netPrice: z
    .number({ error: "Podaj cenę netto." })
    .min(0.01, "Cena nie może być mniejsza niż jeden grosz."),
  grossPrice: z
    .number({ error: "Podaj cenę brutto." })
    .min(0.01, "Cena nie może być mniejsza niż jeden grosz."),
  vatRate: z.union(
    VAT_VALUES.map((v) => z.literal(v)),
    { error: "Wybierz stawkę Vat." },
  ),
  currency: z.enum(CURRENCIES, { error: "Wybierz walutę." }),
});

export const stockSchema = z
  .number({ error: "Podaj ilość na magazynie." })
  .int("Ilość musi być liczbą całkowitą.")
  .min(0, "Ilość nie może być ujemna.");

export const step3Shape = {
  available: z.boolean(),
  limited: z.boolean(),
  minCountBasket: z
    .number({ error: "Podaj minimalną ilość." })
    .int("Ilość musi być liczbą całkowitą.")
    .min(1, "Minimalna ilość musi być większa niż 0."),
  maxCountBasket: z
    .number({ error: "Podaj maksymalną ilość." })
    .int("Ilość musi być liczbą całkowitą.")
    .min(1, "Maksymalna ilość musi być większa niż 0."),
  stockQuantity: z.number().or(z.nan()),
};

const refineStep3 = (
  data: {
    limited: boolean;
    stockQuantity: number;
    minCountBasket: number;
    maxCountBasket: number;
  },
  ctx: z.RefinementCtx,
) => {
  if (data.limited) {
    const r = stockSchema.safeParse(data.stockQuantity);

    if (!r.success) {
      ctx.addIssue({
        code: "custom",
        path: ["stockQuantity"],
        message: r.error.issues[0].message,
      });
    }
  }

  if (data.maxCountBasket < data.minCountBasket) {
    ctx.addIssue({
      code: "custom",
      path: ["maxCountBasket"],
      message: "Maksymalna ilość nie może być mniejsza niż minimalna.",
    });
  }
};

export const step3Schema = z.object(step3Shape).superRefine(refineStep3);

export const fullSchema = z
  .object({
    ...step1Schema.shape,
    ...step2Schema.shape,
    ...step3Shape,
  })
  .superRefine(refineStep3);

type FullSchemaOutput = z.output<typeof fullSchema>;

export type ProductFormValues = Omit<
  FullSchemaOutput,
  "manufacturer" | "category"
> & {
  manufacturer: FullSchemaOutput["manufacturer"] | "";
  category: FullSchemaOutput["category"] | "";
};

export const stepSchemas = [step1Schema, step2Schema, step3Schema] as const;

export const stepFieldNames = [
  Object.keys(step1Schema.shape),
  Object.keys(step2Schema.shape),
  Object.keys(step3Shape),
];
