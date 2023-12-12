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
import Chart from "./components/ChartIndex";
import DcOpenOrders from "./components/DcOpenOrders";
import BarChart from "./components/charts/BarChart";
import HomePage from "./components/homePage";
import OrderReport from "./views/OrderReport";
import OrderDetails from "./components/orderDetails/OrderDetails.js";
import { FETCH_TYPES, ROUTES } from "./components/utils/Utils";
import "./index.css";
import FocusRoom from "./components/FocusRoom";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
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
            element={<App appContent={<BarChart />} />}
          />
          <Route
            path={ROUTES.opm}
            element={<App appContent={<Chart type="opm" fetchType={FETCH_TYPES.OPM} />} />}
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
            path={`${ROUTES.orderDetails}/:orderId`}
            element={<App appContent={<OrderDetails />} />}
          />
          <Route
            path={ROUTES.orderReport}
            element={
              <App
                appContent={<OrderReport  />}
              />
            }
          />
          <Route
            path={ROUTES.focusRoom}
            element={
              <App
                appContent={<FocusRoom />}
              />
            }
          />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);
