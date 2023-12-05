import { Document, Schema } from "mongoose";

export enum EGoodsCategory {
    ELECTRONICE_DEVICE = "Electronic Devices",
}

export interface IGoods extends Document {
    name: string;
    category: EGoodsCategory;
    quantity: number;
    weight: number;
    value: number;
    attached: string;
}

export const goodsSchema = new Schema<IGoods>({
    name: { type: String },
    category: { type: String },
    quantity: { type: Number },
    value: { type: Number },
    weight: { type: Number },
    attached: { type: String },
})