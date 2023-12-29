import { InputError } from "@/types/controller";
import { EUserRole, IUser, IUserRole } from "@/types/auth";
import BaseValidator from "./base.validator";
import { IAddress } from "@/models/schema/address.schema";
import { EGenderType, IUserDB } from "@/models/schema/user.schema";
import { ObjectId } from "mongoose";

export interface ICreateUser
    extends Pick<IUserDB, "username" | "email" | "phone" | "name" | "office" | "role"> {
}

export interface IUpdateUser {
    name: string,
    username: string,
    email: string,
    phone: string,
    role: string,
    office: string,
    address: IAddress,
}

export interface IUpdateInfoUser {
    name: string,
    email: string,
    phone: string,
    address: IAddress,
    gender: EGenderType,
}

export interface IUpdateUserName {
    username: string,
}

export interface IUpdateAvatar {
    avatar: string,
}

export interface IUpdatePassword {
    username: string,
    password: string,
}

export interface IUpdateActive {
    active: boolean,
}

export default class RoleValidator extends BaseValidator {
    static checkRole(role: string, und?: boolean) {
        this.checkUnd(role, und, "role", () => {
            if (!Object.values(EUserRole).includes(role as EUserRole))
                throw new InputError("role không hợp lệ", "role", role);
        })
    }

    static checkRoleForCreate(initiatorRole: string, userRole: string) {
        this.checkRole(userRole);

        if (userRole === EUserRole.HEAD) {
            if (initiatorRole !== EUserRole.ADMIN && initiatorRole !== EUserRole.BOD) {
                throw new InputError(initiatorRole + " không tạo được " + userRole, "role")
            }
        } else if (userRole === EUserRole.GATHE_STAF || EUserRole.TRANS_STAF) {
            if (initiatorRole !== EUserRole.ADMIN && initiatorRole !== EUserRole.HEAD) {
                throw new InputError(initiatorRole + " không tạo được " + userRole, "role")
            }
        }
    }

    static checkEditable(creator_id: string, editor_id: string) {
        if (creator_id !== editor_id) {
            throw new InputError("Không có quyển sửa đổi", "role")
        }
    }

    static validateCreateUser(data: ICreateUser) {
        this.checkName(data.name);
        this.checkName(data.username);
        this.checkEmail(data.email);
        this.checkPhone(data.phone)
    }

    static validateUpdateUser(creator_id: string, editor: IUser, data: IUpdateUser) {
        // RoleValidator.checkRoleForCreate(editor.role, data.role);

        // this.checkActionForThisUser(creator_id, editor.uid);
        // this.checkId(data.office, true);

        // this.checkName(data.name, true);
        // this.checkName(data.username, true);
        // this.checkEmail(data.email, true);
        // this.checkPhone(data.phone, true);
    }

    static validateDeleteUser(creator_id: string, editor: IUser) {
        this.checkEditable(creator_id, editor.uid);
    }

    static validateOnlyManagerInOffice(user: (Object & { office: ObjectId })[], office: string, role: IUserRole, und?: boolean) {
        if (!und) {
            if (user.length > 0 && user.some(e => e.office.toString() === office) && role === EUserRole.HEAD) {
                throw new InputError("Đã tồn tại quản lý trong office", "office");
            }
        }
    }

    static validateEmployeeSameOfficeManager(offie_creator: string, offie_user: string, role_user: string, und?: boolean) {
        if (!und) {
            if (role_user === EUserRole.GATHE_STAF || role_user === EUserRole.TRANS_STAF) {
                if (offie_creator !== offie_user) {
                    throw new InputError("Nhân viên và quản lý phải chung office", "user");
                }
            }
        }
    }
}