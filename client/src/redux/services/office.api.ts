import { AxiosResponse } from "axios";
import axios from "@/service/axios";
import { OfficeStatus, OfficeStatusQuery } from "./queries/office.office";

export interface OfficeStatusWrapper<T = OfficeStatus> {
    data: {
        offices: T[]
    }
}

export async function getOfficeStatus(): Promise<AxiosResponse<OfficeStatusWrapper>> {
    return await axios.post("/graphql", {
        query: OfficeStatusQuery.loc?.source.body
    })
}

export async function deleteOffice(id: string): Promise<AxiosResponse<OfficeStatusWrapper>> {
    return await axios.delete("/office/" + id)
}

export async function createOffice(id: string): Promise<AxiosResponse<OfficeStatusWrapper>> {
    return await axios.post("/office/" + id)
}

export async function getSuggestionOffice(name: string): Promise<AxiosResponse<OfficeStatusWrapper>> {
    return await axios.get("/office/gather", { params: { name } })
}