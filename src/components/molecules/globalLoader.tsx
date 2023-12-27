import React from "react";
import GlobalLoaderIcon from "../../assets/loader.gif";
import CustomImage from "../atoms/customimage";
import { LoaderProps } from "../../@types/components/commonTypes";

const GlobalLoader: React.FC<LoaderProps> = (props) => {
  return (
    <CustomImage className={`${props.className}`} src={GlobalLoaderIcon} />
  );
};

export default GlobalLoader;
