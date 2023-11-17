import { Document, ObjectId, Schema } from "mongoose";
import { AddressSchema, IAddress } from "./address.schema"
import { ICustomer, CustomerSchema } from "./customer.schema";
import { GoodsSchema, IGoods } from "./goods.chema"
import { PostOfficeBaseModel } from "../base/post_office.base";

export enum EParcelStatus {
    DELIVERING = "delivering",
    DELIVERED = "delivered",
    FAILED = "failed"
}

export interface IParcel extends Document {
    pid: string;
    sender: ICustomer;
    sending_add: IAddress;
    sending_office: ObjectId;
    receiver: ICustomer;
    receiving_add: IAddress;
    receiving_office: ObjectId;
    status: EParcelStatus;
    goods: IGoods[];
    notes: string;
}

export const ParcelSchema = new Schema<IParcel>({
    pid: { type: String, required: true, unique: true, index: true },
    sender: { type: CustomerSchema, required: true },
    sending_add: { type: AddressSchema, required: true },
    sending_office: { type: Schema.Types.ObjectId, require: true, ref: PostOfficeBaseModel },
    receiver: { type: CustomerSchema, required: true },
    receiving_add: { type: AddressSchema, required: true },
    receiving_office: { type: Schema.Types.ObjectId, require: true, ref: PostOfficeBaseModel },
    status: { type: String, required: true },
    goods: { type: [GoodsSchema], required: true },
    notes: { type: String }
})