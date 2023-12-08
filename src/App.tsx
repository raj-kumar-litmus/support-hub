import { FC } from "react";
import AppContent from "./components/AppContent";
import { LoaderProvider } from "./context/LoaderContext";
import { AppProps } from "./@types/components/CommonTypes";

const App: FC<AppProps> = (props) => {
  const { appContent, showSidePane = true, showNavbar = true } = props;
  return (
    <LoaderProvider>
      <AppContent
        showSidePane={showSidePane}
        showNavbar={showNavbar}
        appContent={appContent}
      />
    </LoaderProvider>
  );
};
export default App;
