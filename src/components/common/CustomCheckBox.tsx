import { Checkbox, CheckboxProps } from "primereact/checkbox";

const CustomCheckbox = (props: CheckboxProps) => (
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
