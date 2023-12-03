import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { ParcelStatus } from "../services/queries/status.parcel";

export interface ParcelState {
  parcels: ParcelStatus[]
  isError: boolean
}

const initialState: ParcelState = {
  parcels: [],
  isError: false
};

export const parcelSlice = createSlice({
  name: "parcel",
  initialState,
  reducers: {
    setParcels(state, action) {
      state.parcels = action.payload
    },
    setError: (state, action) => {
      state.isError = action.payload
    }
  },
});

export const { setParcels, setError } = parcelSlice.actions;
export const parcelState = (state: AppState) => state.parcel;
export default parcelSlice.reducer;
