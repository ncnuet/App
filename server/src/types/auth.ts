export type UID = string;
export type Username = string;
export type Phone = string;
export type Email = string;
export type IUserRole = "admin" | "bod" | "trans_head" | "gathe_head" | "trans_staf" | "gathe_staf";

export interface IUser extends IUserWithoutVersion {
    version: string
}

export interface IUserWithoutVersion {
    username: Username,
    uid: UID
    role: IUserRole,
}

export type IUserDetail = {
    username: Username,
    uid: UID,
    phone: Phone,
    email: Email
}