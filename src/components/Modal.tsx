import React from "react";
import { Dialog } from "primereact/dialog";
import { ModalEnums } from "../@types/supportHub";

interface Props {
  children?: React.ReactNode;
  onHide(): void;
  className?: string;
  header: string;
  isTextButton?: boolean;
  visible: boolean;
  position: ModalEnums;
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
  position,
}) => {
  return (
    <Dialog
      header={header}
      visible={visible}
      position={position}
      className={className}
      onHide={onHide}
      draggable={isDraggable}
      resizable={isResizable}
    >
      {children}
    </Dialog>
  );
};

export default CustomModal;
