import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import App from "./App";
import Chart from "./components/organisms/ChartIndex";
import { FocusRoomProvider } from "./context/focusRoom";
import { ROUTES } from "./helpers/utils/utils";
import "./index.css";
import ConnectivityIssues from "./views/connectivityIssues";
import DcOpenOrders from "./views/dcOpenOrders";
import FocusRoom from "./views/focusRoom";
import HomePage from "./views/homePage";
import IncompleteOrder from "./views/incompleteOrders";
import NoInternetConnection from "./views/noInternetConnection";
import OrderDetails from "./views/orderDetails.js";
import OrderReport from "./views/orderReport";
import PageNotFound from "./views/pageNotFound";
import Sessions from "./views/sessions";
import SkuLookup from "./views/skuLookup";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NoInternetConnection>
      <Router>
        <Suspense>
          <Routes>
            <Route path="/" element={<Navigate to={ROUTES.home} />} />
            <Route
              path={ROUTES.home}
              element={<App appContent={<HomePage />} />}
            />
            <Route
              path={ROUTES.dcOpenOrders}
              element={<App appContent={<DcOpenOrders />} />}
            />
            <Route
              path={ROUTES.sessions}
              element={<App appContent={<Sessions />} />}
            />
            <Route
              path={ROUTES.opm}
              element={<App appContent={<Chart type="opm" />} />}
            />
            <Route
              path={`${ROUTES.opm}${ROUTES.fullScreen}`}
              element={
                <App showNavbar={false} appContent={<Chart type="opm" />} />
              }
            />
            <Route
              path={ROUTES.opmComparison}
              element={<App appContent={<Chart type="opmcomparison" />} />}
            />
            <Route
              path={`${ROUTES.opmComparison}${ROUTES.fullScreen}`}
              element={
                <App
                  showNavbar={false}
                  appContent={<Chart type="opmcomparison" />}
                />
              }
            />
            <Route
              path={ROUTES.skuLookup}
              element={<App appContent={<SkuLookup />} />}
            />
            <Route
              path={`${ROUTES.orderDetails}/:orderId`}
              element={<App appContent={<OrderDetails />} />}
            />
            <Route
              path={ROUTES.orderReport}
              element={<App appContent={<OrderReport />} />}
            />
            <Route
              path={ROUTES.incompleteOrders}
              element={<App appContent={<IncompleteOrder />} />}
            />
            <Route
              path={ROUTES.focusRoom}
              element={
                <App
                  appContent={
                    <FocusRoomProvider>
                      <FocusRoom />
                    </FocusRoomProvider>
                  }
                  showNavbar={false}
                  showSidePane={false}
                  bg="bg-black-109"
                  padding="px-2.3w py-4h"
                />
              }
            />
            <Route
              path={ROUTES.connectivityIssues}
              element={<App appContent={<ConnectivityIssues />} />}
            />
            <Route
              path={ROUTES.pageNotFound}
              element={<App appContent={<PageNotFound />} />}
            />
            <Route
              path="*"
              element={<Navigate replace to={ROUTES.pageNotFound} />}
            />
          </Routes>
        </Suspense>
      </Router>
    </NoInternetConnection>
    ,
  </React.StrictMode>,
);
