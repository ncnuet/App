import { IPostOfficeType } from "@/types/post_office";
import { Address } from "./common/address";
import { Schema, model } from 'mongoose';

export interface IPostOffice {
    poid: String,
    name: String,
    address: Address,
    managerId: String,
    hotline: String,
    fax: String,
    email: String,
    post_office_type: IPostOfficeType,
    post_office_id: String, // TODO: rename
}

const postOfficeSchema = new Schema<IPostOffice>({
    poid: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    address: { type: Object, required: true },
    managerId: { type: String, required: true },
    hotline: { type: String },
    fax: { type: String },
    email: { type: String },
    post_office_type: { type: String, required: true },
    post_office_id: { type: String },
})

export const PostOfficeBaseModel = model<IPostOffice>('post_office', postOfficeSchema);