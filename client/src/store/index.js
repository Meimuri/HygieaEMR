import { configureStore } from "@reduxjs/toolkit";

import login from "./reducers/login";
import notification from "./reducers/notification";

const store = configureStore({
    reducer: { login, notification },
});

export default store;
