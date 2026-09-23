import { useRef } from "react";
import { withForm } from "@/lib/form/form";
import { productDefaultValues } from "@/lib/form/defaultValues";
import { FieldGroup } from "@/components/ui/field";
import {
  manufacturerOptions,
  categoryOptions,
  featuresOptions,
  vatRatesOptions,
  currenciesOptions,
} from "@/lib/constants";

const round2 = (n: number) => Math.round(n * 100) / 100;

const ProductForm = withForm({
  defaultValues: productDefaultValues,
  props: { step: 0 as number },

  render: function ProductFormRender({ form, step }) {
    const isSyncing = useRef(false);

    const recalcFromNet = (net: number, vat: number) => {
      if (isSyncing.current || Number.isNaN(net)) return;
      isSyncing.current = true;
      form.setFieldValue("priceGross", round2(net * (1 + vat / 100)));
      isSyncing.current = false;
    };

    const recalcFromGross = (gross: number, vat: number) => {
      if (isSyncing.current || Number.isNaN(gross)) return;
      isSyncing.current = true;
      form.setFieldValue("priceNet", round2(gross / (1 + vat / 100)));
      isSyncing.current = false;
    };

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="px-4 py-5"
      >
        {step === 0 && (
          <>
            <FieldGroup className="flex flex-col md:flex-row w-full my-4">
              <form.AppField name="productName">
                {(field) => (
                  <field.TextField
                    label="Nazwa produktu"
                    placeholder="np. MacBook Pro 14"
                  />
                )}
              </form.AppField>
              <form.AppField name="sku">
                {(field) => (
                  <field.TextField
                    label="SKU produktu"
                    placeholder="np. MBP14M3PRO"
                  />
                )}
              </form.AppField>
            </FieldGroup>

            <form.AppField name="description">
              {(field) => (
                <field.TextareaField
                  label="Opis"
                  placeholder="Krótki opis produktu"
                />
              )}
            </form.AppField>

            <FieldGroup className="flex flex-col md:flex-row w-full my-4">
              <form.AppField name="manufacturer">
                {(field) => (
                  <field.SelectField
                    label="Producent"
                    options={manufacturerOptions}
                    placeholder="Wybierz producenta"
                  />
                )}
              </form.AppField>
              <form.AppField name="category">
                {(field) => (
                  <field.SelectField
                    label="Kategoria"
                    options={categoryOptions}
                    placeholder="Wybierz kategorię"
                  />
                )}
              </form.AppField>
            </FieldGroup>
            <form.AppField name="features">
              {(field) => (
                <field.ChipsField
                  label="Cechy produktu"
                  options={featuresOptions}
                />
              )}
            </form.AppField>
          </>
        )}

        {step === 1 && (
          <>
            <FieldGroup className="flex flex-col md:flex-row w-full my-4">
              <form.AppField
                name="priceNet"
                listeners={{
                  onChange: ({ value }) => {
                    const vat = form.getFieldValue("vatRate");
                    recalcFromNet(value, vat);
                  },
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
                name="priceGross"
                listeners={{
                  onChange: ({ value }) => {
                    const vat = form.getFieldValue("vatRate");
                    recalcFromGross(value, vat);
                  },
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

            <FieldGroup className="flex flex-col md:flex-row w-full my-4">
              <form.AppField
                name="vatRate"
                listeners={{
                  onChange: ({ value }) => {
                    const net = form.getFieldValue("priceNet");
                    recalcFromNet(net, value);
                  },
                }}
              >
                {(field) => (
                  <field.SelectField
                    label="Stawka Vat"
                    placeholder="Wybierz stawkę"
                    options={vatRatesOptions}
                  />
                )}
              </form.AppField>

              <form.AppField name="currency">
                {(field) => (
                  <field.SelectField
                    label="Waluta"
                    placeholder="Wybierz walutę"
                    options={currenciesOptions}
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </>
        )}

        {step === 2 && (
          <>
            <FieldGroup className="flex flex-col md:flex-row w-full">
              <form.AppField name="available">
                {(field) => <field.SwitchField label="Produkt jest dostępny" />}
              </form.AppField>

              <form.AppField name="stock">
                {(field) => <field.NumberField label="Ilość na magazynie" />}
              </form.AppField>
            </FieldGroup>

            <form.AppField name="limited">
              {(field) => <field.CheckboxField label="Produkt limitowany" />}
            </form.AppField>

            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Limity koszyka</p>
              <FieldGroup className="flex flex-col md:flex-row w-full">
                <form.AppField name="minCountBasket">
                  {(field) => (
                    <field.NumberField
                      label="Minimalna ilość"
                      placeholder="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="maxCountBasket">
                  {(field) => (
                    <field.NumberField
                      label="Maksymalna ilość"
                      placeholder="10"
                    />
                  )}
                </form.AppField>
              </FieldGroup>
            </div>
          </>
        )}
      </form>
    );
  },
});

export default ProductForm;
