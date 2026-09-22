import * as z from "zod";

import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/lib/form/form";
import { manufacturerOptions, featuresOptions } from "@/lib/constants";

const formSchema = z.object({
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
  manufacturer: z.string().min(1, "Wybierz producenta."),
  category: z.string().min(1, "Wybierz kategorię."),
  features: z.array(z.string()).min(1, "Wybierz co najmniej jedną cechę."),
});

export default function ProductForm() {
  const form = useAppForm({
    defaultValues: {
      productName: "",
      sku: "",
      description: "",
      manufacturer: "",
      category: "",
      features: [] as string[],
    },
    validators: {
      onChange: formSchema,
      onBlur: formSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="px-4 py-5"
    >
      <FieldGroup className="flex flex-col md:flex-row w-full my-4">
        <form.AppField name="productName">
          {(field) => (
            <field.TextField
              label="Nazwa produktu"
              placeholder="np. MacBook Pro 14"
            />
          )}
        </form.AppField>
        <form.AppField name="sku">
          {(field) => (
            <field.TextField
              label="SKU produktu"
              placeholder="np. MBP14M3PRO"
            />
          )}
        </form.AppField>
      </FieldGroup>

      <form.AppField name="description">
        {(field) => (
          <field.TextareaField
            label="Opis"
            placeholder="Krótki opis produktu"
          />
        )}
      </form.AppField>

      <FieldGroup className="flex flex-col md:flex-row w-full my-4">
        <form.AppField name="manufacturer">
          {(field) => (
            <field.SelectField
              label="Producent"
              options={manufacturerOptions}
              placeholder="Wybierz producenta"
            />
          )}
        </form.AppField>
        <form.AppField name="category">
          {(field) => (
            <field.SelectField
              label="Kategoria"
              options={manufacturerOptions}
              placeholder="Wybierz kategorię"
            />
          )}
        </form.AppField>
      </FieldGroup>
      <form.AppField name="features">
        {(field) => (
          <field.ChipsField label="Cechy produktu" options={featuresOptions} />
        )}
      </form.AppField>
    </form>
  );
}
