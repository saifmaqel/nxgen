import DevicesPanel from "@/features/devices/DevicesPanel";
import { Outlet } from "react-router-dom";

export default function DeviceManagementLayout() {
  return (
    <div className="flex flex-col w-full mx-auto gap-8 overflow-auto h-full">
      <div className="grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-8 flex-1 px-6 py-6 overflow-auto">
        <DevicesPanel />
        <Outlet />
      </div>
    </div>
  );
}
