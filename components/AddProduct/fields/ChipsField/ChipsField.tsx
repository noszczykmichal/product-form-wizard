import { cn } from "cn";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useFieldContext } from "@/lib/form/form-context";

type Option = { value: string; label: string };
type Props = { label: string; options: Option[] };

export default function ChipsField({ label, options }: Props) {
  const field = useFieldContext<string[]>();
  const selected = field.state.value;
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const labelId = `${field.name}-label`;

  const toggle = (value: string) => {
    field.handleChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
    field.handleBlur();
  };

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel id={labelId}>{label}</FieldLabel>
      <div
        role="group"
        aria-labelledby={labelId}
        className="flex flex-wrap gap-2"
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected.includes(option.value)}
            onClick={() => toggle(option.value)}
            className={cn(
              "cursor-pointer rounded-full border border-input px-2.5 py-0.5 text-sm text-muted-foreground transition-colors outline-none",
              "hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
              "aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
