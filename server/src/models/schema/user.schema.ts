
import { IUserRole } from '@/types/auth';
import { Document, Schema, model } from 'mongoose';

export interface IUserSchema extends Document {
    username: string;
    password: string;
    role: IUserRole;
    version: number;
    email: string;
    phone: string;
    name: string;
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
    },
    { timestamps: true });