import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
    reducerPath: "doctorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/doctors",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().login.user.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: () => "/",
        }),
    }),
    keepUnusedDataFor: 240, // Cache time
});

export const { useGetDoctorsQuery } = doctorApi;
