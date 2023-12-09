import { Document, Schema } from "mongoose";

export interface ICustomer {
    name: string;
    phone: string;
}

export interface ICustomerSchema extends ICustomer, Document { }

export const customerSchema = new Schema<ICustomerSchema>({
    name: { type: String, required: true },
    phone: { type: String, required: true }
})