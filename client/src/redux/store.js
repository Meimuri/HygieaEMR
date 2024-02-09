import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import notificationReducer from "./reducers/notification";
import loginReducer from "./reducers/login";

import { patientApi } from "./api/patient";
import { encounterApi } from "./api/encounter";
import { examinationApi } from "./api/examination";
import { locationApi } from "./api/location";
import { doctorApi } from "./api/doctor";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        login: loginReducer,
        [patientApi.reducerPath]: patientApi.reducer,
        [encounterApi.reducerPath]: encounterApi.reducer,
        [examinationApi.reducerPath]: examinationApi.reducer,
        [locationApi.reducerPath]: locationApi.reducer,
        [doctorApi.reducerPath]: doctorApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            patientApi.middleware,
            encounterApi.middleware,
            examinationApi.middleware,
            locationApi.middleware,
            doctorApi.middleware
        ),
});

setupListeners(store.dispatch);

export default store;
