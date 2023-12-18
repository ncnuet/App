import { EFormType, IFormDB } from "@/models/schema/form.chema";
import { InputError } from "@/types/controller";

export interface IFormCreate extends IFormDB {
  
}

export interface IContentFormUpdate extends IFormCreate {

}

export interface IFormUpdate {
    id_form: string;
    receiver: string;
    type: string;
    content: IContentFormUpdate[];
}

export default class FormValidator {
    static validateType(type: string) {
        if(type !== EFormType.SEND_TO_GATHE_STAF &&  type !== EFormType.SEND_TO_RECEIVER && type != EFormType.SEND_TO_TRANS_STAF) {
            throw new InputError("Incorrect type of form", "form");
        }

        return true;
    }

    static validatePermission (creator: string, editor: string, und?: boolean) {
        if(!und) {
            throw new InputError("Invalid permision", "form");
        }
        return true;
    }
}