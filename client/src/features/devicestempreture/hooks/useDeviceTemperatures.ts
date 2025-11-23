import { useQuery } from "@tanstack/react-query";
import { getDeviceTempInRange } from "@/api/handlers/tempApi";
import { DEVICE_TEMPS_QUERY_KEY } from "../constants";

interface UseDeviceTemperaturesParams {
  deviceId: number | undefined;
  from: string | Date;
  to: string | Date;
  enabled?: boolean;
}

export function useDeviceTemperatures({
  deviceId,
  from,
  to,
  enabled = true,
}: UseDeviceTemperaturesParams) {
  return useQuery({
    queryKey: [DEVICE_TEMPS_QUERY_KEY, deviceId, from, to],
    queryFn: () => getDeviceTempInRange(deviceId!, from, to),
    enabled: enabled && !!deviceId,
  });
}
