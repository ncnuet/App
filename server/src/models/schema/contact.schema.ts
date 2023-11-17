import { Document, Schema } from "mongoose";

export interface IContact extends Document {
    hotline: string,
    fax: string,
    email: string,
}

export const contactSchema = new Schema<IContact>({
    hotline: { type: String },
    fax: { type: String },
    email: { type: String },
})