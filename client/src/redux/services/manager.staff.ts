import { AxiosResponse } from "axios";
import axios from "@/service/axios";
export interface IStaffInfor {
  avatar: string;
  username: string;
  email: string;
  role: string;
  id: string;
}

export interface IGetStaffAPIProps {
  data: IStaffInfor[];
  message: string;
}
export interface IStaffdetailInfor {
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  office: string;
  password: string;
  address: string;
}

export interface IEditStaffInfor {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IEditStaffPassword {
  username: string;
  password: string;
}

export async function getStaffInfor(
  pid: string
): Promise<AxiosResponse<IGetStaffAPIProps>> {
  return await axios.get("/auth/created-people", {
    params: {
      pid: pid,
    },
  });
}

export async function editStaffInfor(
  pid: string,
  data: any
): Promise<AxiosResponse<any>> {
  return await axios.put(`/auth/${pid}`, data);
}
