import { withForm } from "@/lib/form/form";
import { productDefaultValues } from "@/lib/form/defaultValues";
import { FieldGroup } from "@/components/ui/field";
import {
  manufacturerOptions,
  categoryOptions,
  featuresOptions,
} from "@/lib/constants";
import { step1Schema } from "@/lib/form/schema";

const Step1 = withForm({
  defaultValues: productDefaultValues,
  render: function Step1Render({ form }) {
    return (
      <div className="flex flex-col gap-4">
        <FieldGroup className="flex flex-col md:flex-row w-full gap-4">
          <form.AppField
            name="productName"
            validators={{
              onChange: step1Schema.shape.productName,
              onBlur: step1Schema.shape.productName,
            }}
          >
            {(field) => (
              <field.TextField
                label="Nazwa produktu"
                placeholder="np. MacBook Pro 14"
              />
            )}
          </form.AppField>
          <form.AppField
            name="sku"
            validators={{
              onChange: step1Schema.shape.sku,
              onBlur: step1Schema.shape.sku,
            }}
          >
            {(field) => (
              <field.TextField
                label="SKU produktu"
                placeholder="np. MBP14M3PRO"
              />
            )}
          </form.AppField>
        </FieldGroup>

        <form.AppField
          name="description"
          validators={{
            onChange: step1Schema.shape.description,
            onBlur: step1Schema.shape.description,
          }}
        >
          {(field) => (
            <field.TextareaField
              label="Opis"
              placeholder="Krótki opis produktu"
            />
          )}
        </form.AppField>

        <FieldGroup className="flex flex-col md:flex-row w-full">
          <form.AppField
            name="manufacturer"
            validators={{
              onChange: step1Schema.shape.manufacturer,
              onBlur: step1Schema.shape.manufacturer,
            }}
          >
            {(field) => (
              <field.SelectField
                label="Producent"
                options={manufacturerOptions}
                placeholder="Wybierz producenta"
              />
            )}
          </form.AppField>
          <form.AppField
            name="category"
            validators={{
              onChange: step1Schema.shape.category,
              onBlur: step1Schema.shape.category,
            }}
          >
            {(field) => (
              <field.SelectField
                label="Kategoria"
                options={categoryOptions}
                placeholder="Wybierz kategorię"
              />
            )}
          </form.AppField>
        </FieldGroup>
        <form.AppField
          name="features"
          validators={{
            onChange: step1Schema.shape.features,
            onBlur: step1Schema.shape.features,
          }}
        >
          {(field) => (
            <field.ChipsField
              label="Cechy produktu"
              options={featuresOptions}
            />
          )}
        </form.AppField>
      </div>
    );
  },
});

export default Step1;
