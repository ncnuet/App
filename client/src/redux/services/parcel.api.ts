import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { parcelStatusQuery, ParcelStatusWraper as ParcelStatusWrapper } from "./queries/status.parcel";
import { ParcelDetailsWraper, parcelDetailsQuery } from "./queries/details.parcel";
import axios from "@/service/axios";
import { AxiosResponse } from "axios";

export const parcelAPI = createApi({
    reducerPath: "parcelApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_HOST + "/graphql"
    }),
    endpoints: (builder) => ({
        getParcelStatus: builder.query<ParcelStatusWrapper, { pids: string[] }>({
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
                    variables: { pids: [pid] }
                },
                method: "POST"
            })
        })
    })
})

export async function getParcelStatus(pids: string[]): Promise<AxiosResponse<ParcelStatusWrapper>> {
    return await axios.post("/graphql", {
        query: parcelStatusQuery.loc?.source.body,
        variables: { pids }
    })
}

export const { useGetParcelStatusQuery, useGetParcelDetailsQuery } = parcelAPI;
