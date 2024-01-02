import { Dialog, DialogProps } from "primereact/dialog";

const CustomDialog = (props: DialogProps) => (
  <Dialog
    {...props}
    draggable={false}
    resizable={false}
    maximizable={false}
    dismissableMask={true}
  >
    {props.children}
  </Dialog>
);

export default CustomDialog;
