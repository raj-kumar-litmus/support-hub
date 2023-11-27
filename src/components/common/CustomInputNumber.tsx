import { InputNumber, InputNumberProps } from "primereact/inputnumber";

interface Props extends InputNumberProps {
  containerclassname?: string;
  labelclassname?: string;
  label?: string;
  incrementButtonIcon?: any;
  decrementButtonIcon?: any;
}

const CustomInputNumber = (props: Props) => (
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
