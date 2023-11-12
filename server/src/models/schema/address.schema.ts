import { Schema } from "mongoose";

export interface IAddressLevel {
    id: string;
    name: string;
}

export interface IAddress {
    country: IAddressLevel;
    province: IAddressLevel;
    district: IAddressLevel;
    commune: IAddressLevel;
    detail: string;
    lat: number;
    long: number;
}

export const AddressLevelSchema = new Schema<IAddressLevel>({
    id: { type: String, required: true },
    name: { type: String, required: true }
})

export const AddressSchema = new Schema<IAddress>({
    country: { type: AddressLevelSchema, required: true },
    province: { type: AddressLevelSchema, required: true },
    district: { type: AddressLevelSchema, required: true },
    commune: { type: AddressLevelSchema, required: true },
    detail: { type: String },
    lat: { type: Number },
    long: { type: Number }
})