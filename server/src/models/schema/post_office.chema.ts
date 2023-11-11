import { IPostOfficeType } from "@/types/post_office";
import { Address } from "./common/address";
import { Schema, model } from 'mongoose';

interface IPostOffice {
    poid: String,
    name: String,
    address: Address,
    managerId: String,
    hotline: String,
    fax: String,
    email: String,
    post_office_type: IPostOfficeType,
    post_office_id: String,
}

const postOfficeSchema = new Schema<IPostOffice>({
    poid: {type: String},
    name: {type: String},
    address:{type: Object},
    managerId: {type: String},
    hotline: {type: String},
    fax: {type: String},
    email: {type: String},
    post_office_type: {type: String},
    post_office_id: {type: String},
})

export const PostOfficeModel = model<IPostOffice>('post_office', postOfficeSchema);