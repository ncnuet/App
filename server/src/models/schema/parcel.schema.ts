import { Document, ObjectId, Schema } from "mongoose";
import { addressSchema, IAddress } from "./address.schema"
import { ICustomer, customerSchema } from "./customer.schema";
import { goodsSchema, IGoods } from "./goods.chema"
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

export const parcelSchema = new Schema<IParcel>({
    pid: { type: String, required: true, unique: true, index: true },
    sender: { type: customerSchema, required: true },
    sending_add: { type: addressSchema, required: true },
    sending_office: { type: Schema.Types.ObjectId, require: true, ref: PostOfficeBaseModel },
    receiver: { type: customerSchema, required: true },
    receiving_add: { type: addressSchema, required: true },
    receiving_office: { type: Schema.Types.ObjectId, require: true, ref: PostOfficeBaseModel },
    status: { type: String, required: true },
    goods: { type: [goodsSchema], required: true },
    notes: { type: String }
})