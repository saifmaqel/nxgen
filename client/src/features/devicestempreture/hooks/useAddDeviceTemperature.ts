import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDeviceTemp } from "@/api/handlers/tempApi";
import { DEVICE_TEMPS_QUERY_KEY } from "../constants";

interface AddTemperatureParams {
  deviceId: number;
  timestamp: string | Date;
  value: number;
}


export function useAddDeviceTemperature(resetForm: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deviceId, timestamp, value }: AddTemperatureParams) =>
      addDeviceTemp(deviceId, timestamp, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEVICE_TEMPS_QUERY_KEY] });
      resetForm();
    },
  });
}
