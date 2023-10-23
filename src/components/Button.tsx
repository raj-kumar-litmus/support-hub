import React from "react";
import { Button } from "primereact/button";

interface Props {
  className?: string;
  isTextButton?: boolean;
  isDisabled?: boolean;
  isRounded?: boolean;
  id?: string;
  children?: React.ReactNode;
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
  severity,
  isRounded,
  isDisabled,
  className,
  children,
  isTextButton = false,
}) => {
  return (
    <div className={className}>
      <Button
        label={label}
        id={id}
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
