import { InputError } from "@/types/controller";
import { findLevel1ById } from 'dvhcvn'
import { ICustomer as _ICustomer } from "@/models/schema/customer.schema";
import { IContact as _IContact } from "@/models/schema/contact.schema";
import { IAddress as _IAddress } from "@/models/schema/address.schema";
export interface IAddress
    extends _IAddress {
    // country: string;
    // province: string;
    // district: string;
    // commune: string;
}

export interface IAddress2 {
    country: string;
    province: string;
    district: string;
    commune: string;
}

export interface IContact extends _IContact { }
export interface ICustomer extends _ICustomer { }

export default abstract class BaseValidator {
    protected static checkUnd(
        data: any, und: boolean, key: string,
        callback: () => void, message: string = key): boolean {
        if (data) callback();
        else if (!und) throw new InputError("Phải bao gồm " + message, key);
        return true;
    }

    protected static checkId(id: string, und?: boolean, key: string = "id", message: string = key) {
        this.checkUnd(id, und, "id", () => {
            if (id.length != 24)
                throw new InputError(message + " không hợp lệ", key);
        })
    }

    protected static checkEmail(email: string, und?: boolean) {
        var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        this.checkUnd(email, und, "email", () => {
            if (!email || !emailRegex.test(email)) {
                throw new InputError("Email không hợp lệ", "email");
            }
        })
    }

    protected static checkPhone(phone: string, und?: boolean) {
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

        this.checkUnd(phone, und, "phone", () => {
            if (!phoneRegex.test(phone)) {
                throw new InputError("Phone không hợp lệ", "phone");
            }
        })
    }

    protected static checkName(name: string, und?: boolean) {
        const nameRegex = /[a-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ']/;

        this.checkUnd(name, und, "name", () => {
            if (!nameRegex.test(name.toLowerCase())) {
                throw new InputError("Name không hợp lệ", "name");
            }
        })
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

            const _province = findLevel1ById(address.province.id);

            if (!_province) throw new InputError("Invalid province id", "address.province");
            const _district = _province.findLevel2ById(address.district.id)
            if (!_district) throw new InputError("Invalid district id", "address.district");
            const _commune = _district.findLevel3ById(address.commune.id)
            if (!_commune) throw new InputError("Invalid commune id", "address.commune");
        } else if (!und) throw new InputError("Must included address", "address");
    }

    protected static checkAddress2(address: IAddress2, und?: boolean) {
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