import { useQuery } from "@tanstack/react-query";
import { getDevices } from "@/api/handlers/deviceApi";
import { DEVICES_LIST_QUERY_KEY } from "../constants";

export function useDevices() {
  return useQuery({
    queryKey: [DEVICES_LIST_QUERY_KEY],
    queryFn: getDevices,
  });
}
