import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDevice } from "@/api/handlers/deviceApi";
import { DEVICES_LIST_QUERY_KEY } from "../constants";

export function useAddDevice(resetForm: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => addDevice(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEVICES_LIST_QUERY_KEY] });
      resetForm();
    },
  });
}
