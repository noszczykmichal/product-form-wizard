import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "@/lib/form/form-context";
import TextField from "@/components/AddProduct/fields/TextField/TextField";
import TextareaField from "@/components/AddProduct/fields/TextareaField/TextareaField";
import SelectField from "@/components/AddProduct/fields/SelectField/SelectField";
import ChipsField from "@/components/AddProduct/fields/ChipsField/ChipsField";
import SwitchField from "@/components/AddProduct/fields/SwitchField/SwitchField";
import CheckboxField from "@/components/AddProduct/fields/CheckboxField/CheckboxField";
import NumberField from "@/components/AddProduct/NumberField/NumberField";
import NumberSelectField from "@/components/AddProduct/fields/NumberSelectField/NumberSelectField";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    SelectField,
    ChipsField,
    SwitchField,
    CheckboxField,
    NumberField,
    NumberSelectField,
  },
  formComponents: {},
});
