import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { AppLoader } from "./components/AppLoader";

const DeviceManagementLayout = lazy(
  () => import("./pages/DeviceManagementLayout")
);
const DeviceManagementHomePage = lazy(
  () => import("./pages/DeviceManagementHomePage")
);
const DeviceTemperaturePage = lazy(
  () => import("./pages/DeviceTemperaturePage")
);
const DeviceVisualizationPage = lazy(
  () => import("./pages/DeviceVisualizationPage")
);

function App() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<DeviceManagementLayout />}>
            <Route index element={<DeviceManagementHomePage />} />
            <Route
              path="device/:deviceId"
              element={<DeviceTemperaturePage />}
            />
          </Route>
          <Route
            path="device/:deviceId/charts"
            element={<DeviceVisualizationPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
