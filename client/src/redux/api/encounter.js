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
        updateEncounter: builder.mutation({
            query: ({ encounterId, updatedEncounter }) => ({
                url: `/${encounterId}`,
                method: "PUT",
                body: updatedEncounter,
            }),
            onQueryStarted: async (
                { encounterId },
                { dispatch, queryFulfilled }
            ) => {
                queryFulfilled
                    .then(({ data }) => {
                        console.log(data);
                        dispatch(
                            encounterApi.util.updateQueryData(
                                "getEncounters",
                                { patientId: data.patientId.toString() },
                                (encounters = []) => {
                                    const encounterIndex = encounters.findIndex(
                                        (encounter) =>
                                            encounter.id === Number(encounterId)
                                    );
                                    if (encounterIndex !== -1) {
                                        encounters[encounterIndex] = data;
                                    }
                                }
                            )
                        );

                        dispatch(
                            encounterApi.util.upsertQueryData(
                                "getOneEncounter",
                                encounterId.toString(),
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
    keepUnusedDataFor: 240,
});

export const {
    useGetEncountersQuery,
    useGetOneEncounterQuery,
    useAddEncounterMutation,
    useUpdateEncounterMutation,
} = encounterApi;
