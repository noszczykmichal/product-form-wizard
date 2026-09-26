import { useState } from "react";
import * as z from "zod";
import { useAppForm } from "@/lib/form/form";
import { fullSchema, stepSchemas, stepFieldNames } from "@/lib/form/schema";
import { Dispatch, SetStateAction } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import clsx from "cn/lite";
import { toast } from "sonner";
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
      const {
        limited,
        stockQuantity,
        grossPrice: _grossPrice,
        ...rest
      } = fullSchema.parse(value);

      const product: Product = limited
        ? { ...rest, limited: true, stockQuantity }
        : { ...rest, limited: false };

      onAdd(product);
      toast.success("Produkt został dodany");
      handleOpenChange(false);
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

    fields.forEach((name) => {
      if (!form.getFieldMeta(name)) {
        return;
      }

      form.setFieldMeta(name, (m) => ({
        ...m,
        isTouched: true,
        errorMap: { ...m.errorMap, onChange: errors[name], onBlur: undefined },
      }));
    });

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
      <DialogContent
        className="flex flex-col p-0 gap-0
    inset-0 w-full max-w-full h-dvh translate-x-0 translate-y-0 rounded-none border-0
    md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
    sm:max-w-3xl md:max-w-180 md:h-auto md:max-h-[calc(100dvh-2rem)] md:rounded-lg md:border"
      >
        <DialogHeader className="px-4 py-6 shrink-0">
          <DialogTitle className="text-base font-medium ">
            Dodaj nowy produkt
          </DialogTitle>
        </DialogHeader>
        <div className="shrink-0">
          <FormSteps step={step} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ProductForm form={form} step={step} />
        </div>

        <DialogFooter className="shrink-0 mx-0 mb-0 flex flex-row justify-between sm:justify-between">
          <Button
            variant="ghost"
            onClick={goBack}
            className={clsx(
              "border border-border cursor-pointer",
              step > 0 ? "" : "invisible",
            )}
          >
            <ArrowLeft />
            Wstecz
          </Button>

          {isLastStep ? (
            <Button
              onClick={handleAdd}
              className="rounded-full h-9 px-4 py-2 cursor-pointer"
            >
              Zapisz produkt
            </Button>
          ) : (
            <Button
              onClick={goNext}
              className="rounded-full h-9 px-4 py-2 cursor-pointer"
            >
              Dalej <ArrowRight />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
