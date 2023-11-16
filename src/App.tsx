import { FC } from "react";
import AppContent from "./components/appcontent";
import { LoaderProvider } from "./context/loaderContext";

type Props = {
  appContent: any;
  showSidePane?: boolean;
  showNavbar?: boolean;
};

const App: FC<Props> = ({
  appContent,
  showSidePane = true,
  showNavbar = true,
}) => {
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
