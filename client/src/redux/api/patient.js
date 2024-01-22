import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientApi = createApi({
    reducerPath: "patientApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/patients",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().login.user.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getPatients: builder.query({
            query: () => "/",
        }),
        getOnePatient: builder.query({
            query: (id) => `/${id}`,
        }),
        addPatient: builder.mutation({
            query: (newPatient) => ({
                url: "/",
                method: "POST",
                body: newPatient,
            }),
            // onSuccess: (result, queryApi, extra) => {
            //     // Update the cache for getPatients
            //     queryApi.update("getPatients", (data) => {
            //         // Add the new patient to the list

            //         console.log("Result Data: ");
            //         console.log(result);
            //         console.log("----------");
            //         console.log("Cache Data: ");
            //         console.log(data);
            //         console.log("----------");
            //         console.log("Combined Data: ");
            //         console.log([...data, result]);
            //         console.log("----------");

            //         return [...data, result];
            //     });

            //     // Update the cache for getOnePatient
            //     // queryApi.patch(`getOnePatient/${result.id}`, () => result);
            // },
        }),
    }),
});

export const {
    useGetPatientsQuery,
    useGetOnePatientQuery,
    useAddPatientMutation,
} = patientApi;
