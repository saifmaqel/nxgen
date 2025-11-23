export interface Device {
  id: number;
  name: string;
  createdAt: string;
}

export interface Temperature {
  id: number;
  deviceId: number;
  timestamp: string;
  value: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface AddDeviceRequest {
  name: string;
}

export interface AddDeviceTempRequest {
  timestamp: string | Date;
  value: number;
}

export type AddDeviceResponse = ApiResponse<Device>;
export type ListDevicesResponse = ApiResponse<Device[]>;
export type AddDeviceTempResponse = ApiResponse<Temperature>;
export type GetDeviceTempRangeResponse = ApiResponse<Temperature[]>;
