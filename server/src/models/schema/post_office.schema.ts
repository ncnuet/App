import { EPostOfficeType } from "@/types/post_office";
import { IAddress } from "./address.schema";
import { Document, ObjectId, Schema } from 'mongoose';
import { UserBaseModel } from "../base/user.base";
import { ContactSchema, IContact } from "./contact.schema";
import { PostOfficeBaseModel } from "../base/post_office.base";

export interface IPostOffice extends Document {
    name: String,
    address: IAddress,
    manager: ObjectId,
    contact: IContact,
    post_office_type: EPostOfficeType,
    gather_office: ObjectId,
}

export const PostOfficeSchema: Schema = new Schema<IPostOffice>({
    name: { type: String, required: true },
    address: { type: Object, required: true },
    manager: { type: Schema.Types.ObjectId, required: true, ref: UserBaseModel },
    contact: { type: ContactSchema, required: true },
    post_office_type: { type: String, required: true },
    gather_office: { type: Schema.Types.ObjectId, required: true, ref: PostOfficeBaseModel }
})