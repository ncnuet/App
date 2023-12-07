import { InputError } from "@/types/controller";
import { findLevel1ById } from 'dvhcvn'

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

export interface ICustomer {
    name: string;
    phone: string;
}

export default abstract class BaseValidator {
    protected static checkId(id: string, und?: boolean) {
        if (id) {
            if (id.length != 24) throw new InputError("Invalid id", "id");
        } else if (!und) throw new InputError("Must include id", "id");
    }

    protected static checkPid(pid: string, und?: boolean) {
        if (pid) {
            if (pid.length != 10) throw new InputError("Invalid id", "id");
        } else if (!und) throw new InputError("Must include id", "id");
    }

    protected static checkCustomer(customer: ICustomer, und?: boolean) {
        if (customer) {
            if (!customer.name || customer.name.trim().length === 0)
                throw new InputError("Customer must include name", "customer.name");
            if (!customer.phone || customer.phone.trim().length !== 10)
                throw new InputError("Customer must include phone or given phone is invalid", "customer.phone");
        } else if (!und) throw new InputError("Must include customer", "customer");
    }

    protected static checkAddress(address: IAddress, und?: boolean) {
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
            if (!_commune) throw new InputError("Invalid commune id", "address.commune");
        } else if (!und) throw new InputError("Must included address", "address");
    }

    protected static checkContact(contact: IContact, und?: boolean) {
        if (contact) {
            if (!contact.email) throw new InputError("Contact must include contact email", "contact.email");
            if (!contact.fax) throw new InputError("Contact must include contact fax", "contact.fax");
            if (!contact.hotline) throw new InputError("Contact must include contact hotline", "contact.hotline");
        } else if (!und) throw new InputError("Must include contact", "contact");
    }
}