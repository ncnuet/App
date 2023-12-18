import { Document, Schema } from "mongoose";

export interface IAddressLevel {
    id: string;
    name: string;
}

export interface IAddress {
    country: IAddressLevel;
    province: IAddressLevel;
    district: IAddressLevel;
    commune: IAddressLevel;
    detail?: string;
    lat?: number;
    long?: number;
}

export interface IAddressSchema extends IAddress, Document { }
export interface IAddressLevelSchema extends IAddressLevel { }

export const addressLevelSchema = new Schema<IAddressLevelSchema>({
    id: { type: String, required: true },
    name: { type: String, required: true }
})

export const addressSchema = new Schema<IAddressSchema>({
    country: { type: addressLevelSchema, required: true },
    province: { type: addressLevelSchema, required: true },
    district: { type: addressLevelSchema, required: true },
    commune: { type: addressLevelSchema, required: true },
    detail: { type: String },
    lat: { type: Number },
    long: { type: Number }
})