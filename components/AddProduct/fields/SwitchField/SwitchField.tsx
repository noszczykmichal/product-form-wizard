import { useFieldContext } from "@/lib/form/form-context";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SwitchField({ label }: { label: string }) {
  const field = useFieldContext<boolean>();

  return (
    <div className="flex items-center justify-between py-3 border-b">
      <Label htmlFor={field.name} className="text-sm font-normal">
        {label}
      </Label>
      <Switch
        id={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked)}
      />
    </div>
  );
}
