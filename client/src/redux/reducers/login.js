import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import { setNotification } from "./notification";

const loginSlice = createSlice({
    name: "login",
    initialState: { user: null, isLoading: true },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isLoading = false; // Set loading to false when user is set
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export const { setUser, setLoading } = loginSlice.actions;

export const handleLocalStorageLogin = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem("loggedEMRUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
        } else {
            dispatch(setLoading(false));
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
