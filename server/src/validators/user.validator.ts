import { InputError } from "@/types/controller";
import { EUserRole, IUser } from "@/types/auth";
import BaseValidator from "./base.validator";
import { IAddress } from "@/models/schema/address.schema";
import { EGenderType, IUserDB } from "@/models/schema/user.schema";

export interface ICreateUser
    extends Pick<IUserDB, "username" | "role" | "email" | "phone" | "name" | "office"> {
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

    static checkActionForThisUser(creator_id: string, editor_id: string) {
        if (creator_id !== editor_id) {
            throw new InputError("The creator is different from the editor.", "role")
        }
    }

    static validateCreateUser(creatorRole: string, data: ICreateUser) {
        this.checkRoleForCreate(creatorRole, data.role);
        this.checkName(data.name);
        this.checkName(data.username);
        this.checkEmail(data.email);
        this.checkPhone(data.phone);
        this.checkId(data.office, true);
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
        this.checkActionForThisUser(creator_id, editor.uid);
    }

    static validateOnlyManagerInOffice(user: Object[], und?: boolean) {
        if (!und) {
            if (user.length > 0) {
                throw new InputError("Đã tồn tại quản lý trong ofice", "user");
            }
        }
    }
}