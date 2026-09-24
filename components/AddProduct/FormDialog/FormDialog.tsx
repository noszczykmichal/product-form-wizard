import { useState } from "react";
import * as z from "zod";
import { useAppForm } from "@/lib/form/form";
import { fullSchema, stepSchemas, stepFieldNames } from "@/lib/form/schema";
import { Dispatch, SetStateAction } from "react";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import FormSteps from "@/components/AddProduct/FormSteps/FormSteps";
import ProductForm from "@/components/AddProduct/ProductForm/ProductForm";
import { Button } from "@/components/ui/button";
import { productDefaultValues } from "@/lib/form/defaultValues";

type FieldName = keyof typeof productDefaultValues;

interface FormDialogProps {
  open: boolean;
  openChange: Dispatch<SetStateAction<boolean>>;
  onAdd: (product: Product) => void;
}

export default function FormDialog({
  open,
  openChange,
  onAdd,
}: FormDialogProps) {
  const [step, setStep] = useState(0);
  const isLastStep = step === stepSchemas.length - 1;

  const form = useAppForm({
    defaultValues: productDefaultValues,
    validators: { onSubmit: fullSchema },
    onSubmit: async ({ value }) => {
      const product = { ...value, stock: value.limited ? value.stock : null };
      // onAdd(product);
      console.log(product);
    },
  });

  const validateStep = (index: number) => {
    const fields = stepFieldNames[index] as FieldName[];
    const result = stepSchemas[index].safeParse(form.state.values);

    const errors: Partial<Record<FieldName, z.core.$ZodIssue>> = {};

    if (!result.success) {
      for (const issue of result.error.issues) {
        const name = issue.path[0] as FieldName;
        errors[name] ??= issue;
      }
    }

    fields.forEach((name) =>
      form.setFieldMeta(name, (m) => ({
        ...m,
        isTouched: true,
        errorMap: { ...m.errorMap, onChange: errors[name] },
      })),
    );

    return result.success;
  };

  const goNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));
  const handleAdd = () => {
    if (!validateStep(step)) return;
    form.handleSubmit();
  };

  const handleOpenChange = (next: boolean) => {
    openChange(next);
    if (!next) {
      form.reset();
      setStep(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 gap-0 sm:max-w-180">
        <DialogHeader className="px-4 py-6 ">
          <DialogTitle className="text-base font-medium ">
            Dodaj nowy produkt
          </DialogTitle>
        </DialogHeader>
        <FormSteps />
        <ProductForm form={form} step={step} />
        <DialogFooter className="flex flex-row justify-end">
          {step > 0 && (
            <Button variant="ghost" onClick={goBack}>
              Wstecz
            </Button>
          )}
          {isLastStep ? (
            <Button onClick={handleAdd}>Dodaj produkt</Button>
          ) : (
            <Button onClick={goNext}>
              Dalej <ArrowRight />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
