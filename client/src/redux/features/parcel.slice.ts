import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { ParcelStatus } from "../services/queries/status.parcel";

export interface ParcelState {
  parcels: ParcelStatus[]
}

const initialState: ParcelState = {
  parcels: [],
};

export const parcelSlice = createSlice({
  name: "parcel",
  initialState,
  reducers: {
    setParcels(state, action) {
      state.parcels = action.payload
    },
  },
});

export const { setParcels } = parcelSlice.actions;
export const parcelState = (state: AppState) => state.parcel;
export default parcelSlice.reducer;
