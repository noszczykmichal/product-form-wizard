import { Field, FieldLabel } from "@/components/ui/field";
import { useFieldContext } from "@/lib/form/form-context";
import { Switch } from "@/components/ui/switch";

export default function SwitchField({ label }: { label: string }) {
  const field = useFieldContext<boolean>();

  return (
    <Field orientation="horizontal">
      <Switch
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked)}
        onBlur={field.handleBlur}
      />
      <FieldLabel htmlFor={field.name} className="font-medium">
        {label}
      </FieldLabel>
    </Field>
  );
}
