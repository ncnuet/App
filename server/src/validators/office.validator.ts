import { InputError } from "@/types/controller";
import { EOfficeType, IOffice } from "@/models/schema/office.schema";
import BaseValidator, { IAddress, IAddress2 } from "./base.validator";

export interface IOfficeCreate
    extends Omit<IOffice, "address"> {
    address: IAddress2
}

export interface IOfficeDelete {
    id: string
}

export interface IOfficeUpdate
    extends Partial<Omit<IOffice, "address">> {
    id: string,
    address?: IAddress2
}

export default class OfficeValidator extends BaseValidator {
    private static checkType(type: string, und?: boolean) {
        if (type) {
            if (!Object.values(EOfficeType).includes(type as EOfficeType))
                throw new InputError("Invalid office's type", "office_type");
        } else if (!und) throw new InputError("Must included office's type", "office_type");
    }

    public static validateCreate(data: IOfficeCreate) {
        this.checkName(data.name);
        this.checkAddress2(data.address);
        this.checkContact(data.contact);
        this.checkType(data.office_type);
        this.checkId(data.gather_office, true);
        this.checkId(data.manager);
    }

    public static validateDelete(data: IOfficeDelete) {
        this.checkId(data.id);
    }

    public static validateUpdate(data: IOfficeUpdate) {
        this.checkId(data.id, true);
        this.checkName(data.name, true);
        this.checkId(data.gather_office, true);
        this.checkId(data.manager, true);
        this.checkAddress2(data.address, true);
        this.checkContact(data.contact, true);
        this.checkType(data.office_type, true);
    }
}