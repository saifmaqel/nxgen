import axios from "axios";
import toast from "react-hot-toast";
import api from "../axios";
import type {
  Temperature,
  AddDeviceTempResponse,
  GetDeviceTempRangeResponse,
} from "../types";

// POST /devices/:id/data
export const addDeviceTemp = async (
  deviceId: number,
  timestamp: string | Date,
  value: number
): Promise<Temperature | null> => {
  try {
    const response = await api.post<AddDeviceTempResponse>(
      `/devices/${deviceId}/data`,
      {
        timestamp,
        value,
      }
    );
    toast.success("Temperature reading added successfully!");
    return response.data.data || null;
  } catch (error: unknown) {
    let errorMessage = "Failed to add temperature reading";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    toast.error(errorMessage);
    return null;
  }
};

// GET /devices/:id/data?from=...&to=...
export const getDeviceTempInRange = async (
  deviceId: number,
  from: string | Date,
  to: string | Date
): Promise<Temperature[]> => {
  try {
    const fromString = from instanceof Date ? from.toISOString() : from;
    const toString = to instanceof Date ? to.toISOString() : to;

    const response = await api.get<GetDeviceTempRangeResponse>(
      `/devices/${deviceId}/data`,
      {
        params: {
          from: fromString,
          to: toString,
        },
      }
    );
    return response.data.data || [];
  } catch (error: unknown) {
    let errorMessage = "Failed to fetch temperature readings";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    toast.error(errorMessage);
    return [];
  }
};
