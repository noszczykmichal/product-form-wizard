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
import { step1Schema, step2Schema, step3Shape } from "@/lib/form/schema";
import { validateStock, validateMaxCountBasket } from "@/lib/form/validators";
import clsx from "cn/lite";

const round2 = (n: number) => Math.round(n * 100) / 100;

const ProductForm = withForm({
  defaultValues: productDefaultValues,
  props: { step: 0 as number },

  render: function ProductFormRender({ form, step }) {
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

            <FieldGroup className="flex flex-col md:flex-row w-full my-4">
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
          </>
        )}

        {step === 1 && (
          <>
            <FieldGroup className="flex flex-col md:flex-row w-full my-4">
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

            <FieldGroup className="flex flex-col md:flex-row w-full my-4">
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
          </>
        )}

        {step === 2 && (
          <>
            <FieldGroup className="flex flex-col md:flex-row w-full border-border border-b pt-5 pb-4">
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

            <FieldGroup className=" flex flex-col md:flex-row md:items-end w-full border-b py-4">
              <form.AppField name="limited">
                {(field) => <field.CheckboxField label="Produkt limitowany" />}
              </form.AppField>
              <form.Subscribe selector={(state) => state.values.limited}>
                {(limited) => (
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
                        className={clsx(limited ? "" : "invisible")}
                      />
                    )}
                  </form.AppField>
                )}
              </form.Subscribe>
            </FieldGroup>

            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Limity koszyka</p>
              <FieldGroup className="flex flex-col md:flex-row w-full">
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
          </>
        )}
      </form>
    );
  },
});

export default ProductForm;
