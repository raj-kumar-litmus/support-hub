import { FC } from "react";
import AppContent from "./components/appcontent";

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
    <div>
      <AppContent
        showSidePane={showSidePane}
        showNavbar={showNavbar}
        appContent={appContent}
      />
    </div>
  );
};
export default App;
