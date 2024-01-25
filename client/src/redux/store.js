import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import notificationReducer from "./reducers/notification";
import loginReducer from "./reducers/login";

import { patientApi } from "./api/patient";
import { encounterApi } from "./api/encounter";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        login: loginReducer,
        [patientApi.reducerPath]: patientApi.reducer,
        [encounterApi.reducerPath]: encounterApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            patientApi.middleware,
            encounterApi.middleware
        ),
});

setupListeners(store.dispatch);

export default store;
