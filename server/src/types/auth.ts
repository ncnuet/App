import { IUserDB } from "@/models/schema/user.schema";

export type IUserRole = "admin" | "bod" | "head" | "trans_staf" | "gathe_staf";
export enum EUserRole {
    ADMIN = "admin",
    BOD = "bod",
    HEAD = "head",
    TRANS_STAF = "trans_staf",
    GATHE_STAF = "gathe_staf"
}

export interface IUser extends IUserWithoutVersion {
    version: string,
    remember: boolean
}

export interface IUserWithoutVersion
    extends Pick<IUserDB, "username" | "role" | "office" | "name" | "avatar" | "active"> {
    uid: string
}

export interface IQueryableUser
    extends Partial<Pick<IUserDB, "username" | "phone" | "email">> {
    uid?: string
}