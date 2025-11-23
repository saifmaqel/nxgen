import DeviceTemperatureCard from "@/features/devicestempreture/DeviceTemperatureCard";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedDevice } from "@/store/deviceSlice";
import { useEffect } from "react";
import { useDevices } from "@/features/devices/hooks/useDevices";

export function DeviceTemperaturePage() {
  const { deviceId } = useParams<{ deviceId: string }>();
  const dispatch = useAppDispatch();
  const { data: devices = [] } = useDevices();

  useEffect(() => {
    if (deviceId && devices.length > 0) {
      const device = devices.find((d) => d.id === parseInt(deviceId));
      if (device) {
        dispatch(setSelectedDevice(device));
      }
    }
  }, [deviceId, devices, dispatch]);

  return <DeviceTemperatureCard />;
}
