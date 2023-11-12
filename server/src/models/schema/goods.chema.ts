import { Schema } from "mongoose";

export enum EGoodCategory {
    ELECTRONICE_DEVICE = "Electronic Devices",
}

export interface IGoods {
    name: string;
    category: EGoodCategory;
    quantity: number;
    weight: number;
    value: number;
    attached: string;
}

export const GoodsSchema = new Schema<IGoods>({
    name: { type: String },
    category: { type: String },
    quantity: { type: Number },
    value: { type: Number },
    weight: { type: Number },
    attached: { type: String },

})