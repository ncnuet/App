import axios, { AxiosResponse } from "axios";

export interface IStaffInfor {
  avatar: string;
  name: string;
  email: string;
  role: string;
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
): Promise<AxiosResponse<IStaffInfor[]>> {
  return await axios.get("/manager", {
    params: {
      pid: pid,
    },
  });
}

export async function editStaffInfor(
  pid: string,
  data: IEditStaffInfor
): Promise<AxiosResponse<IStaffInfor[]>> {
  return await axios.patch("/manager", data, {
    params: {
      pid: pid,
    },
  });
}
