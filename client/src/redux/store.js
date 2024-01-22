import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import notificationReducer from "./reducers/notification";
import loginReducer from "./reducers/login";

import { patientApi } from "./api/patient";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        login: loginReducer,
        [patientApi.reducerPath]: patientApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(patientApi.middleware),
});

setupListeners(store.dispatch);

export default store;
