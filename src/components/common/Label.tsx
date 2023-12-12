import { LabelProps } from "../../@types/components/commonTypes";

const Label = (props: LabelProps) => (
  <div className={`flex ${props.containerClassName}`}>
    <p
      className={`before:content-[' '] before:w-[12px] before:h-[12px] before:bg-[${props.color}] before:rounded-lg before:inline-block`}
    >
      <span className="pl-2">{props.text}</span>
    </p>
  </div>
);

export default Label;
