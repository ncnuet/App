import { model } from "mongoose";
import { IUserSchema, userSchema } from "@/models/schema/user.schema";

export const UserBaseModel = model<IUserSchema>('User', userSchema);