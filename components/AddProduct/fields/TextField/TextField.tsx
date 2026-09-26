import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/lib/form/form-context";
import { clearBlurError } from "@/lib/utils";

type Props = { label: string; placeholder?: string };

export default function TextField({ label, placeholder }: Props) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} className="w-full">
      <FieldLabel htmlFor={field.name} className="leading-normal">
        {label}
      </FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => {
          field.handleChange(e.target.value);
          clearBlurError(field);
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
