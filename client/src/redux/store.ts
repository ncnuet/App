import { configureStore } from "@reduxjs/toolkit";
import { parcelSlice } from "./features/parcel.slice";
import { parcelAPI } from "./services/parcel.api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [parcelSlice.name]: parcelSlice.reducer,
        [parcelAPI.reducerPath]: parcelAPI.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([parcelAPI.middleware])
});

setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
