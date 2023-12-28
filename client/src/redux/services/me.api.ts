import axios from "@/service/axios";
import { AxiosResponse } from "axios";

export async function getMe(): Promise<AxiosResponse<any>> {
    return await axios.get("/auth/me")
}
