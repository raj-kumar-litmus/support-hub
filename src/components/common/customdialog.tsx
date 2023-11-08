import { Dialog, DialogProps } from "primereact/dialog";

const CustomDialog = (props: DialogProps) => (
  <Dialog {...props} dismissableMask={true} draggable={false} resizable={false}>
    {props.children}{" "}
  </Dialog>
);

export default CustomDialog;
