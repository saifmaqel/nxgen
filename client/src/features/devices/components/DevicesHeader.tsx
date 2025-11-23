import { CardHeader, CardTitle } from "@/components/ui/card";
import { AddDeviceDialog } from "./AddDeviceDialog";
import { Server } from "lucide-react";

export function DevicesHeader() {
  return (
    <CardHeader className="flex flex-row items-center justify-between w-full ">
      <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
        <Server className="h-5 w-5 text-primary" />
        <CardTitle>Registered Devices</CardTitle>
      </div>
      <AddDeviceDialog />
    </CardHeader>
  );
}
