import { AxiosResponse } from "axios";
import axios from "@/service/axios";
import { TrackingStatus, TrackingStatusQuery } from "./queries/tracking.parcel";

export interface TrackingStatusWrapper<T = TrackingStatus> {
    data: {
        tracking: T[]
    }
}

export async function getTrackingStatus(pid: string): Promise<AxiosResponse<TrackingStatusWrapper>> {
    return await axios.post("/graphql", {
        query: TrackingStatusQuery.loc?.source.body,
        variables: { pid }
    })
}