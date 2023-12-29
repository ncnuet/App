import { AxiosResponse } from "axios";
import axios from "@/service/axios";
import { gdvParcelsQuery } from "./queries/all.parcel";
import { Address, Customer } from "./queries/details.parcel";

export interface IReviewParcel {
  code: string;
  creator: string;
  status: string;
  createdAt: string;
  sending_add: Address;
  receiving_add: Address;
  receiver: Customer;
  sender: Customer;
  cost: number;
}

export interface IGrapqlReviewParcel {
  data: IReviewParcel[];
  message?: string;
}

export async function getReviewParcels(
  limit: number = 10,
  page: number = 1
): Promise<AxiosResponse<IGrapqlReviewParcel>> {
  return await axios.get("/parcel", {
    params: {
      limit: limit,
      page: page,
    },
  });
}

export async function sendNewParcel(
  limit: number = 10,
  page: number = 1
): Promise<AxiosResponse<IGrapqlReviewParcel>> {
  return await axios.get("/parcel", {
    params: {
      limit: limit,
      page: page,
    },
  });
}
