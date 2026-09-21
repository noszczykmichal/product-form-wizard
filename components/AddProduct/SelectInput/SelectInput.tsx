import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectInput({ form }: {}) {
  return (
    <form.Field name="manufacturer">
      {(field) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="manufacturer">Producent</FieldLabel>
            <Select>
              <SelectTrigger id="manufacturer" className="w-full">
                <SelectValue placeholder="Wybierz producenta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="totis">Totis</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        );
      }}
    </form.Field>
  );
}
