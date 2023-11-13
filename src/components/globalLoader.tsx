import React from "react";
import CustomImage from "./common/customimage";
import GlobalLoaderIcon from "../assets/loader.gif";

interface LoaderProps {
  className?: string;
}

const GlobalLoader: React.FC<LoaderProps> = ({ className }) => {
  return <CustomImage className={`${className}`} src={GlobalLoaderIcon} />;
};

export default GlobalLoader;
