import { Document, ObjectId, Schema } from "mongoose";
import { addressSchema, IAddress } from "./address.schema"
import { ICustomer, customerSchema } from "./customer.schema";
import { EGoodsType, IGoods, goodsSchema } from "./goods.chema"
import { OfficeBaseModel } from "@/models/base/office.base";
import { UserBaseModel } from "@/models/base/user.base";
import mongoosastic, { MongoosasticDocument } from "mongoosastic";

export enum EParcelStatus {
    DELIVERING = "delivering",
    DELIVERED = "delivered",
    FAILED = "failed"
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

export interface IParcel {
    creator: string;
    sender: ICustomer;
    sending_add: IAddress;
    sending_office: string;
    receiver: ICustomer;
    receiving_add: IAddress;
    receiving_office: string;
    status: EParcelStatus;
    goods: IGoods[];
    goods_type: EGoodsType;
    return_type: EReturnType;
    cost: number;
    cost_type: ECostType;
    notes: string;
}

export interface IParcelSchema
    extends Omit<IParcel, "sending_office" | "receiving_office" | "creator">, Document, MongoosasticDocument {
    sending_office: ObjectId;
    receiving_office: ObjectId;
    creator: ObjectId;
    createdAt: Date;
    updateAt: Date;
}

const ParcelSchema = new Schema<IParcelSchema>({
    creator: { type: Schema.Types.ObjectId, required: true, ref: UserBaseModel },
    sender: { type: customerSchema, required: true },
    sending_add: { type: addressSchema, required: true },
    sending_office: { type: Schema.Types.ObjectId, require: true, ref: OfficeBaseModel },
    receiver: { type: customerSchema, required: true },
    receiving_add: { type: addressSchema, required: true },
    receiving_office: { type: Schema.Types.ObjectId, require: true, ref: OfficeBaseModel },
    status: { type: String, required: true },
    goods: { type: [goodsSchema], required: true },
    goods_type: { type: String, required: true },
    return_type: { type: String, required: true },
    cost: { type: Number, required: true },
    cost_type: { type: String, required: true },
    notes: { type: String }
}, {
    timestamps: true
})

// @ts-ignore
ParcelSchema.plugin(mongoosastic)

export default ParcelSchema