import { Document, Schema } from "mongoose";

export interface IContact {
    hotline: string,
    fax: string,
    email: string,
}

export interface IContactSchema extends IContact, Document { }

export const contactSchema = new Schema<IContactSchema>({
    hotline: { type: String },
    fax: { type: String },
    email: { type: String },
})