import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { parcelStatusQuery, ParcelStatus, ParcelStatusWraper } from "./queries/status.parcel";
import { ParcelDetailsWraper, parcelDetailsQuery } from "./queries/details.parcel";

export const parcelAPI = createApi({
    reducerPath: "parcelApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_HOST + "/graphql"
    }),
    endpoints: (builder) => ({
        getParcelStatus: builder.query<ParcelStatusWraper, { pids: string[] }>({
            query: ({ pids }) => ({
                url: "/",
                body: {
                    query: parcelStatusQuery.loc?.source.body,
                    variables: { pids }
                },
                method: "POST"
            })
        }),
        getParcelDetails: builder.query<ParcelDetailsWraper, { pid: string }>({
            query: ({ pid }) => ({
                url: "/",
                body: {
                    query: parcelDetailsQuery.loc?.source.body,
                    variables: { pid }
                },
                method: "POST"
            })
        })
    })
})

export const { useGetParcelStatusQuery, useGetParcelDetailsQuery } = parcelAPI;