import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import { setNotification } from "./notification";

const loginSlice = createSlice({
    name: "login",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
    },
});

export const { setUser } = loginSlice.actions;

export const handleLocalStorageLogin = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem("loggedEMRUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
        }
    };
};

export const handleLogin = ({ username, password }) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({
                username,
                password,
            });
            dispatch(setUser(user));
            window.localStorage.setItem("loggedEMRUser", JSON.stringify(user));
        } catch (error) {
            dispatch(setNotification("Wrong credentials", "error", 5));
        }
    };
};

export const handleLogout = () => {
    return async (dispatch) => {
        window.localStorage.removeItem("loggedEMRUser");
        dispatch(setUser(null));
    };
};

export default loginSlice.reducer;
