import { useRef } from "react";
import { withForm } from "@/lib/form/form";
import { productDefaultValues } from "@/lib/form/defaultValues";
import { FieldGroup } from "@/components/ui/field";
import { vatRatesOptions, currenciesOptions } from "@/lib/constants";
import { step2Schema } from "@/lib/form/schema";

const round2 = (n: number) => Math.round(n * 100) / 100;

const Step2 = withForm({
  defaultValues: productDefaultValues,
  render: function Step2Render({ form }) {
    const isSyncing = useRef(false);

    const recalcFromNet = (net: number, vat: number) => {
      if (isSyncing.current || Number.isNaN(net)) return;
      isSyncing.current = true;
      form.setFieldValue("grossPrice", round2(net * (1 + vat / 100)));
      isSyncing.current = false;
    };

    const recalcFromGross = (gross: number, vat: number) => {
      if (isSyncing.current || Number.isNaN(gross)) return;
      isSyncing.current = true;
      form.setFieldValue("netPrice", round2(gross / (1 + vat / 100)));
      isSyncing.current = false;
    };

    return (
      <div className="flex flex-col gap-4">
        <FieldGroup className="flex flex-col md:flex-row w-full gap-4">
          <form.AppField
            name="netPrice"
            listeners={{
              onChange: ({ value }) => {
                const vat = form.getFieldValue("vatRate");
                recalcFromNet(value, vat);
              },
            }}
            validators={{
              onChange: step2Schema.shape.netPrice,
              onBlur: step2Schema.shape.netPrice,
            }}
          >
            {(field) => (
              <field.NumberField
                label="Cena netto"
                placeholder="0.00"
                step="0.01"
              />
            )}
          </form.AppField>

          <form.AppField
            name="grossPrice"
            listeners={{
              onChange: ({ value }) => {
                const vat = form.getFieldValue("vatRate");
                recalcFromGross(value, vat);
              },
            }}
            validators={{
              onChange: step2Schema.shape.grossPrice,
              onBlur: step2Schema.shape.grossPrice,
            }}
          >
            {(field) => (
              <field.NumberField
                label="Cena brutto"
                placeholder="0.00"
                step="0.01"
              />
            )}
          </form.AppField>
        </FieldGroup>

        <FieldGroup className="flex flex-col md:flex-row w-full">
          <form.AppField
            name="vatRate"
            listeners={{
              onChange: ({ value }) => {
                const net = form.getFieldValue("netPrice");
                recalcFromNet(net, value);
              },
            }}
            validators={{
              onChange: step2Schema.shape.vatRate,
              onBlur: step2Schema.shape.vatRate,
            }}
          >
            {(field) => (
              <field.NumberSelectField
                label="Stawka Vat"
                placeholder="Wybierz stawkę"
                options={vatRatesOptions}
              />
            )}
          </form.AppField>

          <form.AppField
            name="currency"
            validators={{
              onChange: step2Schema.shape.currency,
              onBlur: step2Schema.shape.currency,
            }}
          >
            {(field) => (
              <field.SelectField
                label="Waluta"
                placeholder="Wybierz walutę"
                options={currenciesOptions}
              />
            )}
          </form.AppField>
        </FieldGroup>
      </div>
    );
  },
});

export default Step2;
