import { AxiosResponse } from "axios";
import axios from "@/service/axios";
import { gdvParcelQuery } from "./queries/all.parcel";
import {
  Address,
  Customer,
  EStatusParcel,
  Goods,
} from "./queries/details.parcel";

export interface IReviewParcel {
  code: string;
  creator: string;
  status: EStatusParcel;
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

type goodType = "goods" | "documents" | "goods, documents";
type costType = "receiver pay" | "sender pay";
export interface INewParcel {
  status: EStatusParcel;
  sending_add: Address;
  receiving_add: Address;
  receiver: Customer;
  sender: Customer;
  goods: {
    name: string;
    category: goodType;
    quantity: number;
    weight: number;
    value: number;
  }[];
  notes: string;
  goods_type: goodType;
  return_type: string;
  cost: Number;
  cost_type: costType;
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
  body: INewParcel
): Promise<AxiosResponse<any>> {
  return await axios.post("/parcel", body);
}

export async function getDetailParcel(
  pids: string[]
): Promise<AxiosResponse<INewParcel>> {
  return await axios.post("/graphql", {
    query: gdvParcelQuery.loc?.source.body,
    variables: { pids: pids },
  });
}
