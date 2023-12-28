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
  data: {
    parcels: IReviewParcel[];
  };
}

export async function getReviewParcels(): Promise<
  AxiosResponse<IGrapqlReviewParcel>
> {
  return await axios.get("/parcel");
}
