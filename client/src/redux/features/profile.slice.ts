import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface MeState {
    isLogin: boolean,
    name: string,
    username: string,
    office: string
}

interface IPayload {
    payload: Omit<MeState, "isLogin">,
    type: string,
}

const initialState: MeState = {
    isLogin: false,
    name: "guest",
    username: "",
    office: ""
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile(state, action: IPayload) {
            state.isLogin = true;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.office = action.payload.office;
        },
        logout(state, action) {
            state = initialState
        }
    },
});

export const { setProfile, logout } = profileSlice.actions;
export const profileState = (state: AppState) => state.profile;
export default profileSlice.reducer;
