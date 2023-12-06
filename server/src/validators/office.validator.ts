import { InputError } from "@/types/controller";
import { findLevel1ById } from 'dvhcvn'

export enum EPostOfficeType {
    Gathering = "gathering",
    Transaction = "transaction",
    Headquarters = "headquarters",
}

export interface IContact {
    hotline: string,
    fax: string,
    email: string,
}

export interface IAddress {
    country: string;
    province: string;
    district: string;
    commune: string;
    detail?: string;
    lat?: number;
    long?: number;
}

export interface IOfficeCreate {
    name: string,
    address: IAddress,
    manager?: string,
    contact: IContact,
    post_office_type: EPostOfficeType,
    gather_office?: string,
}

export interface IOfficeDelete {
    id: string
}

export interface IOfficeUpdate {
    id: string,
    name?: string,
    address?: IAddress,
    manager?: string,
    contact?: IContact,
    post_office_type?: EPostOfficeType,
    gather_office?: string,
}

export default class OfficeValidate {
    private static checkId(id: string, und?: boolean) {
        if (id) {
            if (id.length != 24) throw new InputError("Invalid id", "id");
        } else if (!und) throw new InputError("Must include id", "id");
    }

    private static checkName(name: string, und?: boolean) {
        if (name) {

        } else if (!und) throw new InputError("Must included office's name", "name");
    }

    private static checkType(type: string, und?: boolean) {
        if (type) {
            if (!Object.values(EPostOfficeType).includes(type as EPostOfficeType))
                throw new InputError("Invalid office's type", "post_office_type");
        } else if (!und) throw new InputError("Must included office's type", "post_office_type");
    }

    private static checkAddress(address: IAddress, und?: boolean) {
        if (address) {
            if (!address.country) throw new InputError("Address must included country code", "address.country");
            if (!address.province) throw new InputError("Address must include province code", "address.province");
            if (!address.district) throw new InputError("Address must included district code", "address.district");
            if (!address.commune) throw new InputError("Address must included commune code", "address.commune");

            const _province = findLevel1ById(address.province);
            if (!_province) throw new InputError("Invalid province id", "address.province");
            const _district = _province.findLevel2ById(address.district)
            if (!_district) throw new InputError("Invalid district id", "address.district");
            const _commune = _district.findLevel3ById(address.commune)
            if (!_district) throw new InputError("Invalid commune id", "address.commune");
        } else if (!und) throw new InputError("Must included office's address", "address");
    }

    private static checkContact(contact: IContact, und?: boolean) {
        if (contact) {
            if (!contact.email) throw new InputError("Contact must include contact email", "contact.email");
            if (!contact.fax) throw new InputError("Contact must include contact fax", "contact.fax");
            if (!contact.hotline) throw new InputError("Contact must include contact hotline", "contact.hotline");
        } else if (!und) throw new InputError("Must include contact", "contact");
    }

    public static validateCreate(data: IOfficeCreate) {
        this.checkName(data.name);
        this.checkAddress(data.address);
        this.checkContact(data.contact);
        this.checkType(data.post_office_type);
    }

    public static validateDelete(data: IOfficeDelete) {
        this.checkId(data.id);
    }

    public static validateUpdate(data: IOfficeUpdate) {
        this.checkId(data.id, true);
        this.checkId(data.gather_office, true);
        this.checkId(data.manager, true);
        this.checkAddress(data.address, true);
        this.checkContact(data.contact, true);
        this.checkType(data.post_office_type, true);
    }
}