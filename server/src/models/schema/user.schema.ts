
import { IUserRole, UID, Username } from '@/types/auth';
import { Schema, model, connect } from 'mongoose';

interface IUserSchema {
    uid: UID;
    username: Username;
    password: string;
    role: IUserRole;
    version: number;
}

const userSchema = new Schema<IUserSchema>({
    uid: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    version: { type: Number, required: true}
});

export const UserModel = model<IUserSchema>('User', userSchema);