import { Schema } from "mongoose";

export enum EGoodsCategory {
    ELECTRONICE_DEVICE = "electronic devices",
}

export enum EGoodsType {
    DOCUMENT = "documentation",
    GOODS = "goods",
}

export interface IGoods {
    name: string;
    category: EGoodsCategory;
    quantity: number;
    weight: number;
    value: number;
    attached: string;
}

export interface IGoodsSchema extends IGoods, Document {}

export const goodsSchema = new Schema<IGoodsSchema>({
    name: { type: String },
    category: { type: String },
    quantity: { type: Number },
    value: { type: Number },
    weight: { type: Number },
    attached: { type: String },
})