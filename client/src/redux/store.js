import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./reducers/login";
import notificationReducer from "./reducers/notification";

const store = configureStore({
    reducer: {
        login: loginReducer,
        notification: notificationReducer,
    },
});

export default store;
