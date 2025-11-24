import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedDevice } from "@/store/deviceSlice";
import { useEffect, useState } from "react";
import { useDevices } from "@/features/devices/hooks/useDevices";
import { useDeviceTemperatures } from "@/features/devicesTempreture/hooks/useDeviceTemperatures";
import { DeviceInfoCards } from "@/features/visualization/components/DeviceInfoCards";
import { DeviceTemperatureLineChart } from "@/features/visualization/components/DeviceTemperatureLineChart";
import { DeviceTemperatureAreaChart } from "@/features/visualization/components/DeviceTemperatureAreaChart";
import { AllDevicesComparisonChart } from "@/features/visualization/components/AllDevicesComparisonChart";
import {
  DateRangePicker,
  type DateRange,
} from "@/features/visualization/components/DateRangePicker";
import { Thermometer, ArrowLeft } from "lucide-react";
import { AppLoader } from "@/components/AppLoader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DeviceVisualizationPage() {
  const { deviceId } = useParams<{ deviceId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedDevice = useAppSelector((state) => state.device.selectedDevice);
  const { data: devices = [] } = useDevices();

  // the prev 7 days by default
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(Date.now() + 24 * 60 * 60 * 1000),
    label: "Last 7 Days",
  });

  const { data: temperatureData, isLoading: isLoadingTemps } =
    useDeviceTemperatures({
      deviceId: deviceId ? parseInt(deviceId) : undefined,
      from: dateRange.from,
      to: dateRange.to,
    });

  const temperatures = temperatureData || [];

  useEffect(() => {
    if (deviceId && devices.length > 0) {
      const device = devices.find((d) => d.id === parseInt(deviceId));
      if (device) {
        dispatch(setSelectedDevice(device));
      }
    }
  }, [deviceId, devices, dispatch]);

  if (isLoadingTemps) {
    return <AppLoader />;
  }

  if (!devices || devices.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Card className="shadow-lg border rounded-xl w-full max-w-md">
          <CardContent className="p-6 text-center text-muted-foreground text-sm">
            No devices available
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!temperatures || temperatures.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Card className="shadow-lg border rounded-xl w-full max-w-md">
          <CardContent className="p-6 text-center text-muted-foreground text-sm">
            No temperature data available for the selected period
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 w-full mx-auto">
      <div className="flex items-center gap-4 mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/device/${deviceId}`)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Thermometer className="h-8 w-8 text-primary" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">
              {selectedDevice?.name || `Device ${deviceId}`}
            </h1>
            <p className="text-sm text-muted-foreground">
              Temperature Visualization Dashboard
            </p>
          </div>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      <DeviceInfoCards temperatures={temperatures} />

      <DeviceTemperatureLineChart temperatures={temperatures} />

      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <div className="flex-1">
          <DeviceTemperatureAreaChart temperatures={temperatures} />
        </div>
        <div className="flex-1">
          <AllDevicesComparisonChart devices={devices} />
        </div>
      </div>
    </div>
  );
}
