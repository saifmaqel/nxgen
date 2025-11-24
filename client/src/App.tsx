import { Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { DeviceManagementLayout } from "./pages/DeviceManagementLayout";
import { DeviceManagementHomePage } from "./pages/DeviceManagementHomePage";
import { DeviceTemperaturePage } from "./pages/DeviceTemperaturePage";
import { DeviceVisualizationPage } from "./pages/DeviceVisualizationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<DeviceManagementLayout />}>
          <Route index element={<DeviceManagementHomePage />} />
          <Route path="device/:deviceId" element={<DeviceTemperaturePage />} />
        </Route>
        <Route
          path="device/:deviceId/charts"
          element={<DeviceVisualizationPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
