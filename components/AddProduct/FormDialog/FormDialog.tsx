import { useState } from "react";
import { useAppForm } from "@/lib/form/form";
import { fullSchema, stepSchemas, stepFieldNames } from "@/lib/form/schema";
import { Dispatch, SetStateAction } from "react";
import { ArrowRight } from "lucide-react";

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

interface FormDialogProps {
  open: boolean;
  openChange: Dispatch<SetStateAction<boolean>>;
}

export default function FormDialog({ open, openChange }: FormDialogProps) {
  const [step, setStep] = useState(0);

  const form = useAppForm({
    defaultValues: productDefaultValues,
    validators: { onSubmit: fullSchema },
    onSubmit: async ({ value }) => {
      // full submit
    },
  });

  const goNext = () => {
    const fieldsToCheck = stepFieldNames[step];
    const schema = stepSchemas[step];

    // touch this step's fields so errors can render
    fieldsToCheck.forEach((name) =>
      form.setFieldMeta(name as any, (m) => ({ ...m, isTouched: true })),
    );

    const result = schema.safeParse(form.state.values);

    if (result.success) {
      setStep((s) => Math.min(s + 1, stepFieldNames.length - 1));
      return;
    }

    // push zod's actual messages into each field's error map
    const fieldErrors = result.error.flatten().fieldErrors;
    fieldsToCheck.forEach((name) => {
      const messages = (fieldErrors as Record<string, string[] | undefined>)[
        name
      ];
      form.setFieldMeta(name as any, (m) => ({
        ...m,
        isTouched: true,
        errorMap: {
          ...m.errorMap,
          onChange: messages?.[0],
        },
      }));
    });
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));
  const isLastStep = step === stepFieldNames.length - 1;

  return (
    <Dialog open={open} onOpenChange={openChange}>
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
            <Button onClick={() => form.handleSubmit()}>Dodaj produkt</Button>
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
