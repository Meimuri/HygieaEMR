import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";

const store = configureStore({
    reducer: {
        login: loginReducer,
    },
});

export default store;
