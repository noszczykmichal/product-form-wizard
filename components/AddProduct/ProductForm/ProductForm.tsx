import { withForm } from "@/lib/form/form";
import { productDefaultValues } from "@/lib/form/defaultValues";

import Step1 from "@/components/AddProduct/ProductForm/Step1/Step1";
import Step2 from "@/components/AddProduct/ProductForm/Step2/Step2";
import Step3 from "@/components/AddProduct/ProductForm/Step3/Step3";

const ProductForm = withForm({
  defaultValues: productDefaultValues,
  props: { step: 0 as number },

  render: function ProductFormRender({ form, step }) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="p-4 md:py-5"
      >
        {step === 0 && <Step1 form={form} />}

        {step === 1 && <Step2 form={form} />}

        {step === 2 && <Step3 form={form} />}
      </form>
    );
  },
});

export default ProductForm;
