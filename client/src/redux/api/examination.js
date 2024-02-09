import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setNotification } from "../reducers/notification";

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
    }),
    keepUnusedDataFor: 240,
});

export const { useGetOneExaminationQuery } = examinationApi;
