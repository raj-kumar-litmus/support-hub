import { Dialog, DialogProps } from "primereact/dialog";

const CustomDialog = (props: DialogProps) => (
  <Dialog {...props}>{props.children}</Dialog>
);

export default CustomDialog;
