import React from "react";
import GlobalLoaderIcon from "../assets/loader.gif";
import CustomImage from "./common/customimage";

interface LoaderProps {
  className?: string;
}

const GlobalLoader: React.FC<LoaderProps> = ({ className }) => {
  return <CustomImage className={`${className}`} src={GlobalLoaderIcon} />;
};

export default GlobalLoader;
