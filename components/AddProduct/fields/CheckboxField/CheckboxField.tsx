import { useFieldContext } from "@/lib/form/form-context";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxField({ label }: { label: string }) {
  const field = useFieldContext<boolean>();

  return (
    <div className="flex items-center gap-2 py-3 border-b">
      <Checkbox
        id={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
      />
      <Label htmlFor={field.name} className="text-sm font-normal">
        {label}
      </Label>
    </div>
  );
}
