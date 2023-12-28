import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { parcelSlice } from "./features/parcel.slice";
import { parcelAPI } from "./services/parcel.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { profileSlice } from "./features/profile.slice";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [parcelAPI.reducerPath]
}

const authPersistConfig = {
    key: 'profile',
    storage
};

const rootReducer = combineReducers({
    profile: persistReducer(authPersistConfig, profileSlice.reducer),
    parcel: parcelSlice.reducer,
    [parcelAPI.reducerPath]: parcelAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat([parcelAPI.middleware])
});

setupListeners(store.dispatch);


export const persistor = persistStore(store);
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
