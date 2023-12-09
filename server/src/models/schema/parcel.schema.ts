import { Document, ObjectId, Schema } from "mongoose";
import { addressSchema, IAddress } from "./address.schema"
import { ICustomer, customerSchema } from "./customer.schema";
import { goodsSchema } from "./goods.chema"
import { OfficeBaseModel } from "../base/office.base";
import { ECostType, EParcelStatus, EReturnType } from "@/types/parcel";
import { EGoodsType, IGoods } from "@/types/goods";

export interface IParcel extends Document {
    sender: ICustomer;
    sending_add: IAddress;
    sending_office: ObjectId;
    receiver: ICustomer;
    receiving_add: IAddress;
    receiving_office: ObjectId;
    status: EParcelStatus;
    goods: IGoods[];
    goods_type: EGoodsType;
    return_type: EReturnType;
    cost: number;
    cost_type: ECostType;
    notes: string;
}

export const parcelSchema = new Schema<IParcel>({
    sender: { type: customerSchema, required: true },
    sending_add: { type: addressSchema, required: true },
    sending_office: { type: Schema.Types.ObjectId, require: true, ref: OfficeBaseModel },
    receiver: { type: customerSchema, required: true },
    receiving_add: { type: addressSchema, required: true },
    receiving_office: { type: Schema.Types.ObjectId, require: true, ref: OfficeBaseModel },
    status: { type: String, required: true },
    goods: { type: [goodsSchema], required: true },
    goods_type: { type: String, required: true},
    return_type: {type: String, required: true},
    cost: { type: Number, required: true},
    cost_type: { type: String, required: true},
    notes: { type: String }
})