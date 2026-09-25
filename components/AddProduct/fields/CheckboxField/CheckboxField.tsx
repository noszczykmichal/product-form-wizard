import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useFieldContext } from "@/lib/form/form-context";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxField({ label }: { label: string }) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field orientation="horizontal" data-invalid={isInvalid}>
      <Checkbox
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
      />
      <FieldLabel htmlFor={field.name} className="font-normal">
        {label}
      </FieldLabel>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
