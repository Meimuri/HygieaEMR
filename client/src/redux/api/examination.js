import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setNotification } from "../reducers/notification";

import { encounterApi } from "./encounter";

export const examinationApi = createApi({
    reducerPath: "examinationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/examinations",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().login.user.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getOneExamination: builder.query({
            query: (id) => `/${id}`,
        }),
        addExamination: builder.mutation({
            query: (newExamination) => ({
                url: "/",
                method: "POST",
                body: newExamination,
            }),
            onQueryStarted: async (
                newExamination,
                { dispatch, queryFulfilled }
            ) => {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            examinationApi.util.upsertQueryData(
                                "getOneExamination",
                                data.id.toString(),
                                data
                            )
                        );

                        dispatch(
                            encounterApi.util.updateQueryData(
                                "getOneEncounter",
                                newExamination.encounterId.toString(),
                                (encounter) => {
                                    encounter.examination = data;
                                }
                            )
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                        dispatch(setNotification(error, "error", 5));
                    });
            },
        }),
        updateExamination: builder.mutation({
            query: ({ examinationId, updatedExamination }) => ({
                url: `/${examinationId}`,
                method: "PUT",
                body: updatedExamination,
            }),
            onQueryStarted: async (
                updatedExamination,
                { dispatch, queryFulfilled }
            ) => {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            examinationApi.util.upsertQueryData(
                                "getOneExamination",
                                data.id.toString(),
                                data
                            )
                        );
                    })
                    .catch((error) => {
                        dispatch(setNotification(error, "error", 5));
                    });
            },
        }),
    }),
    keepUnusedDataFor: 240,
});

export const {
    useGetOneExaminationQuery,
    useAddExaminationMutation,
    useUpdateExaminationMutation,
} = examinationApi;
