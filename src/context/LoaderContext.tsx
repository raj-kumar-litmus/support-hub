import { createContext, useState } from "react";
import { LoaderContextType } from "../@types/components/CommonTypes";

export const LoaderContext = createContext<LoaderContextType | null>(null);

export const LoaderProvider = ({ children }: any) => {
  const [showGlobalLoader, setShowGlobalLoader] = useState<boolean>(true);

  const showLoader = () => {
    setShowGlobalLoader(true);
  };

  const hideLoader = () => {
    setShowGlobalLoader(false);
  };

  return (
    <LoaderContext.Provider
      value={{ showGlobalLoader, showLoader, hideLoader }}
    >
      {children}
    </LoaderContext.Provider>
  );
};
