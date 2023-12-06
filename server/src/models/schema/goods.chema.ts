import { IGoods } from "@/types/goods";
import { Schema } from "mongoose";

export const goodsSchema = new Schema<IGoods>({
    name: { type: String },
    category: { type: String },
    quantity: { type: Number },
    value: { type: Number },
    weight: { type: Number },
    attached: { type: String },
})