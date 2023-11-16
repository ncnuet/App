import { Document, Schema, model } from "mongoose";
import { AddressSchema, IAddress } from "./address.schema"
import { ICustomer, CustomerSchema } from "./customer.schema";
import { GoodsSchema, IGoods } from "./goods.chema"

export enum EParcelStatus {
    DELIVERING = "delivering",
    DELIVERED = "delivered",
    FAILED = "failed"
}

export interface IParcel extends Document {
    pid: string;
    sending_add: IAddress;
    receiving_add: IAddress;
    sender: ICustomer;
    receiver: ICustomer;
    status: EParcelStatus;
    goods: IGoods;
}

export const ParcelSchema = new Schema<IParcel>({
    pid: { type: String, required: true, unique: true, index: true },
    sending_add: { type: AddressSchema, required: true },
    receiving_add: { type: AddressSchema, required: true },
    receiver: { type: CustomerSchema, required: true },
    sender: { type: CustomerSchema, required: true },
    status: { type: String, required: true },
    goods: { type: GoodsSchema, required: true }
})