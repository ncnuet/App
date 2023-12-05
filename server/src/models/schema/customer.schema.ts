import { Document, Schema } from "mongoose";

export interface ICustomer extends Document {
    name: string;
    phone: string;
}

export const customerSchema = new Schema<ICustomer>({
    name: { type: String, required: true },
    phone: { type: String, required: true }
})