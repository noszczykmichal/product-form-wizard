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

interface FormDialogProps {
  open: boolean;
  openChange: Dispatch<SetStateAction<boolean>>;
}

export default function FormDialog({ open, openChange }: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent className="p-0 gap-0 sm:max-w-180">
        <DialogHeader className="px-4 py-6 ">
          <DialogTitle className="text-base font-medium ">
            Dodaj nowy produkt
          </DialogTitle>
        </DialogHeader>
        <FormSteps />
        <ProductForm />
        <DialogFooter className="flex flex-row justify-end">
          <Button className="bg-blue-600 rounded-full px-4 py-2 h-9 text-primary-foreground">
            Dalej <ArrowRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
