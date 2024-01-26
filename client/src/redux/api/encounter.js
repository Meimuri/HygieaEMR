import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setNotification } from "../reducers/notification";

export const encounterApi = createApi({
    reducerPath: "encounterApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/encounters",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().login.user.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getEncounters: builder.query({
            query: (params) => ({
                url: "",
                params,
            }),
        }),
        getOneEncounter: builder.query({
            query: (id) => `/${id}`,
        }),
        addEncounter: builder.mutation({
            query: (newEncounter) => ({
                url: "/",
                method: "POST",
                body: newEncounter,
            }),
            onQueryStarted: async (
                newEncounter,
                { dispatch, queryFulfilled }
            ) => {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            encounterApi.util.updateQueryData(
                                "getEncounters",
                                { patientId: data.patientId.toString() },
                                (encounters) => {
                                    encounters.push(data);
                                }
                            )
                        );

                        dispatch(
                            encounterApi.util.upsertQueryData(
                                "getOneEncounter",
                                data.id.toString(),
                                data
                            )
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                        dispatch(setNotification(error, "error", 5));
                    });
            },
        }),
    }),
    keepUnusedDataFor: 240, // Cache time
});

export const {
    useGetEncountersQuery,
    useGetOneEncounterQuery,
    useAddEncounterMutation,
} = encounterApi;
