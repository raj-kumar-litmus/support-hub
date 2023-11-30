import { Dialog } from "primereact/dialog";
import React from "react";
import { CustomModalProps } from "../@types/components/commonTypes";

const CustomModal: React.FC<CustomModalProps> = (props) => {
  const { header = "", isDraggable = false, isResizable = false } = props;
  return (
    <Dialog
      header={header}
      visible={props.visible}
      position={props.position}
      className={props.className}
      closeIcon={props.closeIcon}
      onHide={props.onHide}
      draggable={isDraggable}
      resizable={isResizable}
    >
      {props.children}
    </Dialog>
  );
};

export default CustomModal;
