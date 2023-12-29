import { AxiosResponse } from "axios";
import { ManagerStatusQuery, StaffDetailQuery, StaffStatusQuery, UserDetail, UserStatus } from "./queries/manager.user";
import axios from "@/service/axios";

export interface UserStatusWrapper<T = UserStatus> {
    data: {
        users: T[]
    }
}

export async function getManagerStatus(): Promise<AxiosResponse<UserStatusWrapper>> {
    return await axios.post("/graphql", {
        query: ManagerStatusQuery.loc?.source.body
    })
}

export async function getStaffStatus(pid: string): Promise<AxiosResponse<UserStatusWrapper>> {
    return await axios.post("/graphql", {
        query: StaffStatusQuery.loc?.source.body,
        variables: { offices: [pid] }
    })
}

export async function getDetailStaff(pids: string[]): Promise<AxiosResponse<UserStatusWrapper<UserDetail>>> {
    return await axios.post("/graphql", {
        query: StaffDetailQuery.loc?.source.body,
        variables: { uids: pids }
    });
}

export async function updateActive(id: string, active: boolean) {
    return await axios.put("/auth/" + id + "/active", { active })
}

export async function updateAvatar(id: string, avatar: string) {
    return await axios.put(`/auth/${id}/avatar`, { avatar });
}

export async function updateAccount(id: string, password: string, username: string) {
    return await axios.put(`/auth/${id}/account`, {
        password: password.trim().length === 0 ? undefined : password,
        username: username.trim().length === 0 ? undefined : username
    });
}

export async function updateDetail(id: string, data: any) {
    return await axios.put(`/auth/${id}`, data);
}

export async function createUser(data: object) {
    return await axios.post(`/auth`, data);
}

export async function deleteUser(id: string) {
    return await axios.delete("/auth/" + id);
}