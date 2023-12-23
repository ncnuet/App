import { IContactSchema } from "@/models/schema/contact.schema";
import { EFormType, IContentForm, IFormDB } from "@/models/schema/form.chema";
import { IParcel, IParcelSchema } from "@/models/schema/parcel.schema";
import { EUserRole } from "@/types/auth";
import { InputError } from "@/types/controller";

export interface IFormCreate extends IFormDB {
  
}

export interface IContentFormUpdate extends IFormCreate {

}

export interface IFormUpdate {
    receiver: string;
    type: string;
}

export interface IFormDelete {
    id_form: string;
}

export interface IFormAddItem extends IContentForm{
}

export interface IFormDeleteItem {
    parcel: string;
}

export interface IFormUpdateItem extends IContentForm{

}

export default class FormValidator {
    static validateType(type: string, und?:boolean) {
        if(und === true && !type) {
            return true
        }
        if(type !== EFormType.SEND_TO_GATHE_STAF &&  type !== EFormType.SEND_TO_RECEIVER && type != EFormType.SEND_TO_TRANS_STAF) {
            throw new InputError("Incorrect type of form", "form");
        }

        return true;
    }

    static validatePermission (creator: string, editor: string, und?: boolean) {
        if(!und && creator !== editor) {
            throw new InputError("Invalid permision", "form");
        }
        return true;
    }

    static validateRoleReceiver (role: string, und?: boolean) {
        if(!und && role !== EUserRole.GATHE_STAF && role !== EUserRole.TRANS_STAF) {
            throw new InputError("Invalid receiver", "form");
        }
    }

    static validateParcelOfForm (parcel : Object, und? : boolean) {
        if(!und && parcel === null) {
            throw new InputError("Invalid Parcel of form", "form");
        }
    }

    static validateReceiver (receiver : Object, und? : boolean) {
        if(!und && !receiver) {
            throw new InputError("Invalid receiver of form", "form");
        }
    }

    static validateReceiverAndTypeForm (role: string, type: string, und? : boolean) {
        if(! und && 
           ( (role === EUserRole.GATHE_STAF && type !== EFormType.SEND_TO_GATHE_STAF ) 
           || (role === EUserRole.TRANS_STAF && type !== EFormType.SEND_TO_TRANS_STAF)
           )
        ) {
            throw new InputError("Invalid receiver and type form", "form");
        }
    }
}