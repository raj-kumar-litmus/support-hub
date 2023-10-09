import { Dialog, DialogProps } from "primereact/dialog";

const CustomDialog = (props: DialogProps) => (
  <Dialog
    header={props.header}
    visible={props.visible}
    onHide={props.onHide}>
    {props.children}
  </Dialog>
);

export default CustomDialog;
