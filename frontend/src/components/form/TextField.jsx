import { forwardRef } from "react";
import Input from "../ui/Input";

const TextField = forwardRef(({ error, ...props }, ref) => (
  <Input ref={ref} error={!!error} {...props} />
));

TextField.displayName = "TextField";

export default TextField;
