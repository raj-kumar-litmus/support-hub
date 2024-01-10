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
import NoInternetConnection from "./components/NoInternetConnection";
import Chart from "./components/organisms/ChartIndex";
import DcOpenOrders from "./views/dcOpenOrders";
import HomePage from "./views/homePage";
import OrderDetails from "./views/orderDetails.js";
import OrderReport from "./views/orderReport";
import Sessions from "./views/sessions";
import SkuLookup from "./views/skuLookup";
import { ROUTES } from "./helpers/utils/utils";
import "./index.css";
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
              path={ROUTES.connectivityIssues}
              element={
                <div className="flex flex-col h-[100vh] items-center justify-center bg-black-100 text-white-500">
                  <h1 className="text-5xl">Could Not Connect</h1>
                  <p>
                    We could not establish connection with the APIs. Please
                    check your VPN or contact the back-end team.
                  </p>
                </div>
              }
            />
            <Route
              path={ROUTES.pageNotFound}
              element={
                <div className="flex flex-col h-[100vh] items-center justify-center bg-black-100 text-white-500">
                  <h1 className="text-7xl">404</h1>
                  <p>Page Not Found.</p>
                </div>
              }
            />
            <Route
              path="*"
              element={<Navigate replace to={ROUTES.pageNotFound} />}
            />
          </Routes>
        </Suspense>
      </Router>
    </NoInternetConnection>
  </React.StrictMode>,
);
