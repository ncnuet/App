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

export default class OfficeValidate {
    private static checkName(name: string) {
        if (!name) throw new InputError("Must included office's name", "name");
    }

    private static checkType(type: string) {
        if (!type) throw new InputError("Must included office's type", "post_office_type");
        if (Object.values(EPostOfficeType).includes(type as EPostOfficeType))
            throw new InputError("Invalid office's type", "post_office_type");
    }

    private static checkAddress(address: IAddress) {
        if (!address) throw new InputError("Must included office's address", "address");
        if (!address.country) throw new InputError("Address must included country code", "address.country");
        if (!address.district) throw new InputError("Address must included district code", "address.district");
        if (!address.commune) throw new InputError("Address must included commune code", "address.commune");

        const _province = findLevel1ById(address.province);
        if (!_province) throw new InputError("Invalid province id", "address.province");
        const _district = _province.findLevel2ById(address.district)
        if (!_district) throw new InputError("Invalid district id", "address.district");
        const _commune = _district.findLevel3ById(address.commune)
        if (!_district) throw new InputError("Invalid commune id", "address.commune");
    }

    private static checkContact(contact: IContact) {
        if (!contact) throw new InputError("Must include contact", "contact");
        if (!contact.email) throw new InputError("Contact must include contact email", "contact.email");
        if (!contact.fax) throw new InputError("Contact must include contact fax", "contact.fax");
        if (!contact.hotline) throw new InputError("Contact must include contact hotline", "contact.hotline");
    }

    public static validateCreate(data: IOfficeCreate) {
        this.checkName(data.name);
        this.checkAddress(data.address);
        this.checkContact(data.contact);
        this.checkType(data.post_office_type);
    }

    public static validateDelete(data: IOfficeDelete){

    }
}