import { IContactSchema } from "@/models/schema/contact.schema";
import { EFormType, IContentForm, IFormDB } from "@/models/schema/form.chema";
import { IParcel, IParcelSchema } from "@/models/schema/parcel.schema";
import { ECustomerType, EUserRole } from "@/types/auth";
import { InputError } from "@/types/controller";

export interface IFormUserCreate {
    receiver: string;
    type: string;
    content: IContentForm[];
}

export interface IFormCustomerCreate {
    type: string;
    content: IContentForm[];
}

export interface IContentFormUpdate extends IFormUserCreate {

}

export interface IFormUserUpdate {
    receiver: string;
    type: string;
}

export interface IFormCustomerUpdate {
    type: string;
}

export interface IFormDelete {
    id_form: string;
}

export interface IFormAddItem extends IContentForm {
}

export interface IFormAddItems {
    contentsForm: IContentForm[];
}

export interface IFormDeleteItem {
    parcel: string;
}

export interface IFormDeleteItems {
    parcels: string[];
}

export interface IFormUpdateItem extends IContentForm {

}

export interface IFormUpdateItems {
    contentsForm : IFormUpdateItem[]
}
export default class FormValidator {
    static validateStatus(type: string, und?: boolean) {

        if (und === true && !type) {
            return true
        }
        if (type !== EFormType.SEND.toString() && type !== EFormType.RETURN.toString()) {
            console.log(type);
            throw new InputError("Incorrect type of form", "form");
        }

        return true;
    }

    static validatePermission(creator: string, editor: string, und?: boolean) {
        if (!und && creator !== editor) {
            throw new InputError("Invalid permision", "form");
        }
        return true;
    }

    static validateRoleReceiver(role: string, und?: boolean) {
        if (!und && role !== EUserRole.GATHE_STAF && role !== EUserRole.TRANS_STAF) {
            throw new InputError("Invalid receiver", "form");
        }
    }

    static validateParcelOfForm(parcel: Object, und?: boolean) {
        if (!und && parcel === null) {
            throw new InputError("Invalid Parcel of form", "form");
        }
    }

    static validateReceiver(receiver: Object, und?: boolean) {
        if (!und && !receiver) {
            throw new InputError("Invalid receiver of form", "form");
        }
    }

    static validatePermissionComfirm(receiver: string, editor: string, und?: boolean) {
        if (!und) {
            if (receiver !== editor) {
                throw new InputError("Chỉ người nhận mới có quyền xác nhận", "form");
            }
        }
    }

    static validateExistForm(existingForm: Object, und?: boolean) {
        if (!und) {
            if (existingForm) {
                throw new InputError("Invalid Exist Parcel in form ", "form");
            }
        }
    }

    static validateCreatorAndReceiver(roleReceiver: string, roleCreator: string, und?: true) {

        if (und && roleReceiver === null) {
            return true;
        }


        if (roleCreator === EUserRole.TRANS_STAF && roleReceiver === EUserRole.GATHE_STAF
        ) {
            return true;
        } else {
            throw new InputError("người gửi và người nhận có vai trò không hợp lệ", "form")
        }

    }
}