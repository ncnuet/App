import { InputError } from "@/types/controller";
import BaseValidator, { IAddress, ICustomer } from "./base.validator";
import { EParcelStatus } from "@/types/parcel";
import { IGoods } from "@/types/goods";

export interface IParcelCreate {
    sender: ICustomer;
    sending_add: IAddress;
    sending_office: string;
    receiver: ICustomer;
    receiving_add: IAddress;
    receiving_office?: string;
    status: EParcelStatus;
    goods: IGoods[];
    notes: string;
}

export interface IParcelDelete {
    id: string;
}

export interface IParcelUpdate {
    id: string
    sender?: ICustomer;
    sending_add?: IAddress;
    sending_office: string;
    receiver?: ICustomer;
    receiving_add?: IAddress;
    receiving_office?: string;
    status?: EParcelStatus;
    goods?: IGoods[];
    notes?: string;
}

export interface IParcelUpdateStatus {
    id: string;
    status: EParcelStatus;
    name: string,
    uid: string,
    office: string
}

export default class ParcelValidator extends BaseValidator {
    private static checkStatus(type: string, und?: boolean) {
        if (type) {
            if (!Object.values(EParcelStatus).includes(type as EParcelStatus))
                throw new InputError("Invalid parcel's status", "status");
        } else if (!und) throw new InputError("Must included parcel's status", "status");
    }

    private static checkGoods(goods: IGoods[], und?: boolean) {
        if (goods) {
            if (!Array.isArray(goods))
                throw new InputError("Goods must be an array", "goods");

            if (goods.some(goods => !goods.weight || !goods.value ||
                !goods.category || !goods.quantity || !goods.name))
                throw new InputError("Goods must include value, weight, category, quantity and name", "goods");
        } else if (!und) throw new InputError("Must included parcel's goods", "goods");
    }

    public static validateCreate(data: IParcelCreate) {
        this.checkCustomer(data.sender)
        this.checkCustomer(data.receiver)
        this.checkAddress(data.receiving_add)
        this.checkAddress(data.sending_add)
        this.checkId(data.receiving_office, true)
        this.checkStatus(data.status)
        this.checkGoods(data.goods)
    }

    public static validateDelete(data: IParcelDelete) {
        this.checkId(data.id);
    }

    public static validateUpdate(data: IParcelUpdate) {
        this.checkId(data.id);
        this.checkCustomer(data.sender, true)
        this.checkCustomer(data.receiver, true)
        this.checkAddress(data.receiving_add, true)
        this.checkAddress(data.sending_add, true)
        this.checkId(data.receiving_office, true)
        this.checkStatus(data.status, true)
        this.checkGoods(data.goods, true)
    }

    public static validateUpdateStatus(data: IParcelUpdateStatus) {
        this.checkId(data.id);
        this.checkStatus(data.status);
    }
}