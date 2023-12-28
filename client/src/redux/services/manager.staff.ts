import { AxiosResponse } from "axios";
import axios from "@/service/axios";
import { staffInforQuery } from "./queries/staff.infor";
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

export interface IDetailStaffInfor {
  uid: string;
  name: string;
  username: string;
  role: string;
  email: string;
  phone: string;
}

export interface IGrapthDetailInfor {
  data: {
    users: IDetailStaffInfor[];
  };
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

export async function getDetailStaff(
  pid: string[]
): Promise<AxiosResponse<IGrapthDetailInfor>> {
  return await axios.post("/graphql", {
    query: staffInforQuery.loc?.source.body,
    variables: { userIds: pid },
  });
}

export async function editStaffInfor(
  pid: string,
  data: any
): Promise<AxiosResponse<any>> {
  return await axios.put(`/auth/${pid}`, data);
}

export async function editStaffAccount(
  pid: string,
  data: any
): Promise<AxiosResponse<any>> {
  return await axios.put(`auth/${pid}/password`, data);
}

export async function editStaffAvatar(
  pid: string,
  avatar: string
): Promise<AxiosResponse<any>> {
  return await axios.put(`auth/${pid}/avatar`, {
    avatar: avatar,
  });
}
