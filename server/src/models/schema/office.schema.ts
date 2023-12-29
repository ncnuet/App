import { Document, ObjectId, Schema } from 'mongoose';
import { IAddress } from "./address.schema";
import { contactSchema, IContact } from "./contact.schema";

export enum EOfficeType {
    Gathering = "gathering",
    Transaction = "transaction",
    Headquarters = "headquarters",
}

export interface IOffice {
    name: string,
    address: IAddress,
    manager?: string,
    contact: IContact,
    office_type: EOfficeType,
    gather_office?: string
}

export interface IOfficeSchema
    extends Omit<IOffice, "manager" | "gather_office">, Document {
    manager: ObjectId,
    gather_office: ObjectId
}

export const officeSchema: Schema = new Schema<IOfficeSchema>({
    name: { type: String, required: true },
    address: { type: Object, required: true },
    manager: { type: Schema.Types.ObjectId },
    contact: { type: contactSchema, required: true },
    office_type: { type: String, required: true },
    gather_office: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
})