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

export interface IGraphqlReviewParcel {
  data: IReviewParcel[];
  message?: string;
}

export enum EReturnType {
  CALL_SENDER = "call sender",
  CANCEL = "cancel",
  RETURN_NOW = "return immediately",
  RETURN_LATER = "return later",
  RETURN_OUTDATE = "return if out date",
}

export enum ECostType {
  SENDER_PAY = "sender pay",
  RECEIVER_PAY = "receiver pay",
}

export enum EGoodsType {
  DOCUMENT = "documentation",
  GOODS = "goods",
}
export interface INewParcel {
  status: string;
  sending_add: Address;
  receiving_add: Address;
  receiver: Customer;
  sender: Customer;
  goods: {
    name: string;
    category: string;
    quantity: number;
    weight: number;
    value: number;
  }[];
  notes: string;
  goods_type: string;
  return_type: string;
  cost: Number;
  cost_type: string;
}

export async function getReviewParcels(
  limit: number = 10,
  page: number = 1
): Promise<AxiosResponse<IGraphqlReviewParcel>> {
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
