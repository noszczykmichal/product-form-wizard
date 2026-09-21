import * as z from "zod";
import { useForm } from "@tanstack/react-form";

import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import SelectInput from "@/components/AddProduct/SelectInput/SelectInput";

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
});

export default function ProductForm() {
  const form = useForm({
    defaultValues: {
      productName: "",
      sku: "",
      description: "",
      manufacturer: "",
    },
    validators: {
      onChange: formSchema,
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
      <FieldGroup className="flex flex-row w-full my-4">
        <form.Field name="productName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Nazwa produktu</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="np. MacBook Pro 14"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="sku">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>SKU produktu</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="np. MBP14M3PRO"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <form.Field name="description">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid} className="my-4">
              <FieldLabel htmlFor={field.name}>Nazwa produktu</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Krótki opis produktu"
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={isInvalid}
                />
              </InputGroup>

              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
      <FieldGroup className="flex flex-row w-full my-4">
        <SelectInput formInstance={form} />
      </FieldGroup>
    </form>
  );
}
