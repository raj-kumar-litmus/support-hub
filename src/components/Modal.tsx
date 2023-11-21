import React from "react";
import { Dialog, DialogProps } from "primereact/dialog";

interface Props {
  children?: React.ReactNode;
  onHide(): void;
  closeIcon?: any;
  className?: string;
  header?: string;
  isTextButton?: boolean;
  visible: boolean;
  position: DialogProps["position"];
  isDraggable?: boolean;
  isResizable?: boolean;
}

const CustomModal: React.FC<Props> = ({
  children,
  header = "",
  className,
  isDraggable = false,
  isResizable = false,
  visible,
  onHide,
  closeIcon,
  position,
}) => {
  return (
    <Dialog
      header={header}
      visible={visible}
      position={position}
      className={className}
      closeIcon={closeIcon}
      onHide={onHide}
      draggable={isDraggable}
      resizable={isResizable}
    >
      {children}
    </Dialog>
  );
};

export default CustomModal;
