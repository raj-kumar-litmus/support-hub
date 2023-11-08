import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import DcOpenOrders from "./components/DcOpenOrders";
import BarChart from "./components/charts/BarChart";
import App from "./App";
import Chart from "./components/ChartIndex";
import "./index.css";
import OrderDetails from "./components/orderDetails/OrderDetails.js";
import HomePage from "./components/homePage.js";
import IncompleteOrders from "./components/IncompleteOrders";

// const Loader = lazy(() => import("./components/Loader.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      {/* <Suspense fallback={<Loader />}> */}
      <Suspense>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<App appContent={<HomePage />} />} />
          <Route
            path="/dc-open-orders"
            element={<App appContent={<DcOpenOrders />} />}
          />
          <Route path="/sessions" element={<App appContent={<BarChart />} />} />
          <Route
            path="/opm"
            element={<App appContent={<Chart type="opm" />} />}
          />
          <Route
            path="/opm/full-screen"
            element={
              <App showNavbar={false} appContent={<Chart type="opm" />} />
            }
          />
          <Route
            path="/opm-comparison"
            element={<App appContent={<Chart type="opmcomparison" />} />}
          />
          <Route
            path="/opm-comparison/full-screen"
            element={
              <App
                showNavbar={false}
                appContent={<Chart type="opmcomparison" />}
              />
            }
          />
          <Route
            path="/order-details/:orderId"
            element={<App appContent={<OrderDetails />} />}
          />
          <Route path="/incomplete-orders"
        element={<App appContent={<IncompleteOrders/>}/>}/>
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>,
);
