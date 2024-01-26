import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
    reducerPath: "locationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/locations",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().login.user.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getLocations: builder.query({
            query: () => "/",
        }),
    }),
    keepUnusedDataFor: 240, // Cache time
});

export const { useGetLocationsQuery } = locationApi;
