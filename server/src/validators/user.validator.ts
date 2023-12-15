import { InputError } from "@/types/controller";
import { EUserRole, IUser } from "@/types/auth";
import BaseValidator from "./base.validator";

export interface ICreateUser {
    name: string,
    username: string,
    email: string,
    phone: string,
    role: string,
    office: string,
    password: string;
}

export interface IUpdateUser {
    name: string,
    username: string,
    email: string,
    phone: string,
    role: string,
    active: boolean,
    office: string,
    avatar: string,
}



export default class RoleValidator extends BaseValidator {
    static checkRoleForCreate(initiatorRole: string, creativeRole: string, und?: boolean) {
        if (creativeRole) {
            if (!Object.values(EUserRole).includes(creativeRole as EUserRole))
                throw new InputError("Invalid role's type", "role");
        } else if (!und) throw new InputError("Must included role's type", "role");

        if (creativeRole === EUserRole.HEAD) {
            if (initiatorRole !== EUserRole.ADMIN && initiatorRole !== EUserRole.BOD && !und) {
                throw new InputError("User này không tạo được role này", "role")
            }
        } else if (creativeRole === EUserRole.GATHE_STAF || EUserRole.TRANS_STAF && !und) {
            if (initiatorRole !== EUserRole.ADMIN && initiatorRole !== EUserRole.HEAD) {
                throw new InputError("User này không tạo được role này", "role")
            }
        }
    }

    private static checkName(name: string, und?: boolean) {
        if (name) {
        } else if (!und) throw new InputError("Must included office's name", "name");
    }

    private static checkEmail(email: string, und?: boolean) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (und && email) {

        } else if (!filter.test(email) || !email) {
            throw new InputError("This email is invalid", "email");
        }
    }

    private static checkPhone(phone: string, und?: boolean) {
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (und && !phone) {

        } else if (!vnf_regex.test(phone) || !phone) {
            throw new InputError("This phone is invalid", "phone");
        }
    }

    
    private static checkActionForThisUser(creator_id: string, editor_id: string) {
        if(creator_id !== editor_id) {
            throw new InputError("The creator is different from the editor.", "role")
        }
    }

    static validateCreateUser(creatorRole: string, data: ICreateUser) {
        RoleValidator.checkRoleForCreate(creatorRole, data.role);

        this.checkId(data.office, true);

        this.checkName(data.name);
        this.checkName(data.username);
        this.checkEmail(data.email);
        this.checkPhone(data.phone);
    }

    static validateUpdateUser(creator_id : string, editor: IUser, data: IUpdateUser) {
        RoleValidator.checkRoleForCreate(editor.role, data.role, true);

        this.checkActionForThisUser(creator_id, editor.uid);
        this.checkId(data.office, true);

        this.checkName(data.name, true);
        this.checkName(data.username, true);
        this.checkEmail(data.email, true);
        this.checkPhone(data.phone, true);
    }

    static validateDeleteUser(creator_id : string, editor: IUser) {
        this.checkActionForThisUser(creator_id, editor.uid);
    }
}