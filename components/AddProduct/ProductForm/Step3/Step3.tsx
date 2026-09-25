import { withForm } from "@/lib/form/form";
import { productDefaultValues } from "@/lib/form/defaultValues";
import { FieldGroup } from "@/components/ui/field";

import { step3Shape } from "@/lib/form/schema";
import { validateStock, validateMaxCountBasket } from "@/lib/form/validators";

const Step3 = withForm({
  defaultValues: productDefaultValues,
  render: function Step3Render({ form }) {
    return (
      <div className="flex flex-col gap-4">
        <FieldGroup className="flex flex-col md:flex-row w-full border-border border-b pb-4">
          <form.AppField
            name="available"
            validators={{
              onChange: step3Shape.available,
              onBlur: step3Shape.available,
            }}
          >
            {(field) => <field.SwitchField label="Produkt jest dostępny" />}
          </form.AppField>
        </FieldGroup>

        <FieldGroup className=" flex flex-col md:flex-row md:items-end w-full border-b gap-4 pb-4">
          <form.AppField name="limited">
            {(field) => <field.CheckboxField label="Produkt limitowany" />}
          </form.AppField>
          <form.Subscribe selector={(state) => state.values.limited}>
            {(limited) =>
              limited && (
                <form.AppField
                  name="stockQuantity"
                  validators={{
                    onChangeListenTo: ["limited"],
                    onChange: validateStock,
                  }}
                >
                  {(field) => (
                    <field.NumberField
                      label="Ilość na magazynie"
                      placeholder="0"
                    />
                  )}
                </form.AppField>
              )
            }
          </form.Subscribe>
        </FieldGroup>

        <div>
          <p className="text-sm font-medium">Limity koszyka</p>
          <FieldGroup className="flex flex-col md:flex-row w-full gap-4 mt-4">
            <form.AppField
              name="minCountBasket"
              validators={{
                onChange: step3Shape.minCountBasket,
              }}
            >
              {(field) => <field.NumberField label="Minimalna ilość" />}
            </form.AppField>
            <form.AppField
              name="maxCountBasket"
              validators={{
                onChangeListenTo: ["minCountBasket"],
                onChange: validateMaxCountBasket,
              }}
            >
              {(field) => <field.NumberField label="Maksymalna ilość" />}
            </form.AppField>
          </FieldGroup>
        </div>
      </div>
    );
  },
});

export default Step3;
