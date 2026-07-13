import { Controller } from "react-hook-form";
import FormField from "./FormField";
import Switch from "./Switch";

const FormSwitch = ({ control, name, label, error }) => (
  <FormField label={label} name={name} error={error?.message}>
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Switch id={name} checked={field.value} onChange={field.onChange} label={field.value ? "Yes" : "No"} />
      )}
    />
  </FormField>
);

export default FormSwitch;
