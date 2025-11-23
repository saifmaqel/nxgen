import { Card, CardContent } from "@/components/ui/card";
import { AppLoader } from "@/components/AppLoader";
import { useDevices } from "./hooks/useDevices";
import { DevicesHeader } from "./components/DevicesHeader";
import { DeviceTable } from "./components/DeviceTable";

export default function DevicesPanel() {
  const { data: devices = [], isLoading, error } = useDevices();

  return (
    <Card className="flex flex-col h-full">
      <DevicesHeader />
      <CardContent className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <AppLoader fullscreen={false} />
          </div>
        ) : error ? (
          <p className="text-center py-4 text-red-500">
            Failed to load devices
          </p>
        ) : (
          <DeviceTable devices={devices} />
        )}
      </CardContent>
    </Card>
  );
}
