import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/lib/form/form-context";

type Props = { label: string; placeholder?: string; step?: string };

export default function NumberField({ label, placeholder, step = "1" }: Props) {
  const field = useFieldContext<number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className="w-full">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        type="number"
        step={step}
        value={Number.isNaN(field.state.value) ? "" : field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => {
          const raw = e.target.value;
          field.handleChange(raw === "" ? NaN : Number(raw));
        }}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
