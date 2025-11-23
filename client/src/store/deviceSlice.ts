import type { Device } from "@/api/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DeviceState {
  selectedDevice: Device | null;
}

const initialState: DeviceState = {
  selectedDevice: null,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setSelectedDevice: (state, action: PayloadAction<Device | null>) => {
      state.selectedDevice = action.payload;
    },
    clearSelectedDevice: (state) => {
      state.selectedDevice = null;
    },
  },
});

export const { setSelectedDevice, clearSelectedDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
