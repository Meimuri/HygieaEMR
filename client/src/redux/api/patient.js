import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setNotification } from "../reducers/notification";

export const patientApi = createApi({
    reducerPath: "patientApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/patients",
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
            onQueryStarted: async (
                newPatient,
                { dispatch, queryFulfilled }
            ) => {
                queryFulfilled
                    .then(({ data }) => {
                        const getPatientsNewData = {
                            id: data.id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            birthDate: data.birthDate,
                        };

                        dispatch(
                            patientApi.util.updateQueryData(
                                "getPatients",
                                undefined,
                                (patients) => {
                                    patients.push(getPatientsNewData);
                                }
                            )
                        );

                        dispatch(
                            patientApi.util.upsertQueryData(
                                "getOnePatient",
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
        updatePatient: builder.mutation({
            query: ({ id, updatedPatient }) => ({
                url: `/${id}`,
                method: "PUT",
                body: updatedPatient,
            }),
            onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
                queryFulfilled
                    .then(({ data }) => {
                        dispatch(
                            patientApi.util.updateQueryData(
                                "getPatients",
                                undefined,
                                (patients) => {
                                    const patientIndex = patients.findIndex(
                                        (patient) => patient.id === id
                                    );
                                    if (patientIndex !== -1) {
                                        patients[patientIndex] = data;
                                    }
                                }
                            )
                        );

                        dispatch(
                            patientApi.util.upsertQueryData(
                                "getOnePatient",
                                id.toString(),
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
    useGetPatientsQuery,
    useGetOnePatientQuery,
    useAddPatientMutation,
    useUpdatePatientMutation,
} = patientApi;
