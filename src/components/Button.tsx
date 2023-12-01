import { Button } from "primereact/button";
import React from "react";
import { CustomButtonProps } from "../@types/components/commonTypes";

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const { isTextButton = false } = props;
  return (
    <div id={props.containerId} className={props.className}>
      <Button
        label={props.label}
        id={props.id}
        className={props.btnclassname}
        disabled={props.isDisabled}
        rounded={props.isRounded}
        onClick={props.onClick}
        severity={props.severity}
        text={isTextButton}
      >
        {props.children}
      </Button>
    </div>
  );
};

export default CustomButton;
