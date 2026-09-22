import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "@/lib/form/form-context";
import TextField from "@/components/AddProduct/fields/TextField/TextField";
import TextareaField from "@/components/AddProduct/fields/TextareaField/TextareaField";
import SelectField from "@/components/AddProduct/fields/SelectField/SelectField";
import ChipsField from "@/components/AddProduct/fields/ChipsField/ChipsField";

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, TextareaField, SelectField, ChipsField },
  formComponents: {},
});
