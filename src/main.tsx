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
import DcOpenOrders from "./views/DcOpenOrders";
import BarChart from "./components/charts/BarChart";
import HomePage from "./views/homePage";
import OrderDetails from "./views/OrderDetails";
import OPM from "./views/opm";
import OpmComparison from "./views/opmComparison";
import { ROUTES } from "./components/utils/Utils";
import "./index.css";

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
          <Route path={ROUTES.opm} element={<App appContent={<OPM />} />} />
          <Route
            path={`${ROUTES.opm}${ROUTES.fullScreen}`}
            element={<App showNavbar={false} appContent={<OPM />} />}
          />
          <Route
            path={ROUTES.opmComparison}
            element={<App appContent={<OpmComparison />} />}
          />
          <Route
            path={`${ROUTES.opmComparison}${ROUTES.fullScreen}`}
            element={<App showNavbar={false} appContent={<OpmComparison />} />}
          />
          <Route
            path={`${ROUTES.orderDetails}/:orderId`}
            element={<App appContent={<OrderDetails />} />}
          />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>,
);
