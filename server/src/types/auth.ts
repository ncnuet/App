export type UID = string;
export type IUserRole = "admin" | "bod" | "trans_head" | "gathe_head" | "trans_staf" | "gathe_staf";

export interface IUser extends IUserWithoutVersion {
    version: string,
    remember: boolean
}

export interface IUserWithoutVersion {
    username: string,
    uid: UID
    role: IUserRole,
}

export type IQueryableUser = {
    username?: string,
    uid?: UID,
    phone?: string,
    email?: string
}