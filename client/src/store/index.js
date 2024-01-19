import { configureStore } from "@reduxjs/toolkit";

import login from "./reducers/login";

const store = configureStore({
    reducer: { login },
});

export default store;
