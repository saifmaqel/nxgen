import toast from "react-hot-toast";
import api from "../axios";
import type { AddDeviceResponse, Device, ListDevicesResponse } from "../types";
import axios from "axios";

// POST /devices
export const addDevice = async (name: string): Promise<Device | null> => {
  try {
    const response = await api.post<AddDeviceResponse>("/devices", { name });
    toast.success("Device added successfully!");
    return response.data.data || null;
  } catch (error: unknown) {
    let errorMessage = "Failed to add device";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    toast.error(errorMessage);
    return null;
  }
};

//  GET /devices
export const getDevices = async (): Promise<Device[]> => {
  try {
    const response = await api.get<ListDevicesResponse>("/devices");
    return response.data.data || [];
  } catch (error: unknown) {
    let errorMessage = "Failed to fetch devices";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }

    toast.error(errorMessage);
    return [];
  }
};
