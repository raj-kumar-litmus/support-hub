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
import NoInternetConnection from "./components/NoInternetConnection";
import App from "./App";
import Chart from "./components/ChartIndex";
import "./index.css";
import OrderDetails from "./components/orderDetails/OrderDetails.js";
import HomePage from "./components/homePage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NoInternetConnection>
      <Router>
        <Suspense>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<App appContent={<HomePage />} />} />
            <Route
              path="/dc-open-orders"
              element={<App appContent={<DcOpenOrders />} />}
            />
            <Route
              path="/sessions"
              element={<App appContent={<BarChart />} />}
            />
            <Route
              path="/opm"
              element={<App appContent={<Chart type="opm" />} />}
            />
            <Route
              path="/opm/fullscreen"
              element={
                <App showNavbar={false} appContent={<Chart type="opm" />} />
              }
            />
            <Route
              path="/opmcomparison"
              element={<App appContent={<Chart type="opmcomparison" />} />}
            />
            <Route
              path="/opmcomparison/fullscreen"
              element={
                <App
                  showNavbar={false}
                  appContent={<Chart type="opmcomparison" />}
                />
              }
            />
            <Route
              path="/orderDetails/:orderId"
              element={<App appContent={<OrderDetails />} />}
            />
            <Route
              path="/connectivity-issues"
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
              path="/page-not-found"
              element={
                <div className="flex flex-col h-[100vh] items-center justify-center bg-black-100 text-white-500">
                  <h1 className="text-7xl">404</h1>
                  <p>Page Not Found.</p>
                </div>
              }
            />
            <Route
              path="*"
              element={<Navigate replace to="/page-not-found" />}
            />
          </Routes>
        </Suspense>
      </Router>
    </NoInternetConnection>
  </React.StrictMode>,
);
