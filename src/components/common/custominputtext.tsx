import { InputText, InputTextProps } from "primereact/inputtext";

const CustomInputText = (props: InputTextProps) => (
  <InputText
    type={props.type}
    placeholder={props.placeholder}
    className={props.className}
    onChange={props.onChange}
    value={props.value}
    keyfilter={props.keyfilter}
    disabled={props.disabled}
  />
);

export default CustomInputText;
