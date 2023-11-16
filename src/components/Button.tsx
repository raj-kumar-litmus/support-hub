import React from "react";
import { Button, ButtonProps } from "primereact/button";

interface Props extends ButtonProps {
  className?: string;
  isTextButton?: boolean;
  isDisabled?: boolean;
  isRounded?: boolean;
  id?: string;
  containerId?: string;
  children?: React.ReactNode;
  btnclassname?: string;
  severity?:
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "help"
    | undefined;
  onClick?: () => void;
  label?: string;
}

const CustomButton: React.FC<Props> = ({
  onClick,
  label,
  id,
  containerId,
  severity,
  isRounded,
  isDisabled,
  className,
  btnclassname,
  children,
  isTextButton = false,
}) => {
  return (
    <div id={containerId} className={className}>
      <Button
        label={label}
        id={id}
        className={btnclassname}
        disabled={isDisabled}
        rounded={isRounded}
        onClick={onClick}
        severity={severity}
        text={isTextButton}
      >
        {children}
      </Button>
    </div>
  );
};

export default CustomButton;
