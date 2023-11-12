import { Schema } from "mongoose";

export interface ICustomer {
    name: string;
    phone: string;
}

export const CustomerSchema = new Schema<ICustomer>({
    name: { type: String, required: true },
    phone: { type: String, required: true }
})