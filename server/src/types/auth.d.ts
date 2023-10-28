export type UID = string | undefined;
export type IUserRole = "admin" | "bod" | "trans_head" | "gathe_head" | "trans_staf" | "gathe_staf";

export interface IUser extends IUserWithoutVersion {
    version: string
}

export interface IUserWithoutVersion {
    username: string,
    uid: string
    role: IUserRole,
}