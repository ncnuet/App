import { AxiosResponse } from "axios";
import axios from "@/service/axios";
import { staffInforQuery } from "./queries/staff.infor";
export interface IStaffInfo {
  avatar: string;
  username: string;
  email: string;
  role: string;
  uid: string;
}

export interface IGetStaffAPIProps {
  data: IStaffInfo[];
  message: string;
}
export interface IStaffDetailInfo {
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  office: string;
  password: string;
  address: string;
}

export interface IDetailStaffInfo {
  uid: string;
  name: string;
  username: string;
  role: string;
  email: string;
  phone: string;
}

export interface IGraphDetailInfo {
  data: {
    users: IDetailStaffInfo[];
  };
}

export interface IEditStaffInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IEditStaffPassword {
  username: string;
  password: string;
}

export async function editStaffInfor(
  pid: string,
  data: any
): Promise<AxiosResponse<any>> {
  return await axios.put(`/auth/${pid}`, data);
}


