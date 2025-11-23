import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppLoader } from "@/components/AppLoader";
import { useDeviceTemperatures } from "../hooks/useDeviceTemperatures";
import { TemperatureHeader } from "./TemperatureHeader";
import { TemperatureList } from "./TemperatureList";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";

export function DeviceTemperature() {
  const deviceId = useAppSelector((state) => state.device.selectedDevice?.id);

  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().slice(0, 16);
  });

  const [toDate, setToDate] = useState(() => {
    return new Date().toISOString().slice(0, 16);
  });

  const {
    data: temperatures = [],
    isLoading,
    error,
  } = useDeviceTemperatures({
    deviceId,
    from: fromDate,
    to: toDate,
  });

  if (!deviceId)
    return (
      <div className="h-full text-muted-foreground flex items-center justify-center">
        Please Select a Device from the table...
      </div>
    );

  return (
    <Card className="lg:overflow-hidden">
      <TemperatureHeader deviceId={deviceId} />
      <CardContent className="overflow-y-auto">
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from-date" className="text-sm font-medium">
                From
              </Label>
              <Input
                id="from-date"
                type="datetime-local"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-date" className="text-sm font-medium">
                To
              </Label>
              <Input
                id="to-date"
                type="datetime-local"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <AppLoader fullscreen={false} />
        ) : error ? (
          <p className="text-center py-4 text-red-500">
            Failed to load temperature data
          </p>
        ) : (
          <TemperatureList temperatures={temperatures} isLoading={isLoading} />
        )}
      </CardContent>
    </Card>
  );
}
