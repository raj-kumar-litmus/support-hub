import { InputNumber } from "primereact/inputnumber";
import { CustomInputNumberProps } from "../../@types/components/commonTypes";

const CustomInputNumber = (props: CustomInputNumberProps) => (
  <div className={props.containerclassname}>
    <InputNumber
      inputId="integeronly"
      placeholder={props.placeholder}
      value={props.value}
      min={props.min}
      max={props.max}
      inputClassName={props.inputClassName}
      onValueChange={props.onValueChange}
      onChange={props.onChange}
      incrementButtonIcon={props.incrementButtonIcon}
      decrementButtonIcon={props.decrementButtonIcon}
      {...props}
    />
    {props.label && (
      <label
        htmlFor={props.id || "inputNumber"}
        className={props.labelclassname}
      >
        {props.label}
      </label>
    )}
  </div>
);

export default CustomInputNumber;
