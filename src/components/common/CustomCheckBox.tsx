import { Checkbox } from "primereact/checkbox";
import { CustomCheckboxProps } from "../../@types/components/CommonTypes";

const CustomCheckbox = (props: CustomCheckboxProps) => (
  <div className={props.containerclassname}>
    <Checkbox onClick={props.onClick} id={props.id || "checkbox"} {...props}>
      {props.children}
    </Checkbox>
    {props.label && (
      <label htmlFor={props.id || "checkbox"} className={props.labelclassname}>
        {props.label}
      </label>
    )}
  </div>
);

export default CustomCheckbox;
