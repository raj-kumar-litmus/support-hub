import { FC } from "react";
import { CustomIconProps } from "../../@types/components/commonTypes";
//todo for Sarath. remove this component.
const CustomIcon: FC<CustomIconProps> = (props) => (
  <img {...props} style={{ width: props.width, height: props.height }} />
);

export default CustomIcon;
