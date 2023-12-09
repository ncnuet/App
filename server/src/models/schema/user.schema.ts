
import { EUserRole } from '@/types/auth';
import { Document, ObjectId, Schema } from 'mongoose';
import { OfficeBaseModel } from '@/models/base/office.base';

export interface IUserDB {
    username: string;
    password: string;
    role: EUserRole;
    version: number;
    email: string;
    phone: string;
    name: string;
    office: string;
}

export interface IUserSchema
    extends Omit<IUserDB, "office">, Document {
    office: ObjectId;
}

export const userSchema = new Schema<IUserSchema>(
    {
        username: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        version: { type: Number, required: true },
        email: { type: String, unique: true, index: true },
        phone: { type: String, unique: true, index: true },
        name: { type: String },
        office: { type: Schema.Types.ObjectId, ref: OfficeBaseModel }
    },
    { timestamps: true });