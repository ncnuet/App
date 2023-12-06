import { InputError } from "@/types/controller";
import BaseValidator, { IAddress, ICustomer } from "./base.validator";
import { EParcelStatus } from "@/types/parcel";
import { IGoods } from "@/types/goods";

export interface IParcelCreate {
    pid: string;
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

export default class ParcelValidator extends BaseValidator {
    private static checkStatus(type: string, und?: boolean) {
        if (type) {
            if (!Object.values(EParcelStatus).includes(type as EParcelStatus))
                throw new InputError("Invalid parcel's status", "status");
        } else if (!und) throw new InputError("Must included parcel's status", "status");
    }

    private static checkGood(goods: IGoods[]){
        
    }

    public static validateCreate(data: IParcelCreate) {
        this.checkPid(data.pid)
        this.checkCustomer(data.sender)
        this.checkCustomer(data.receiver)
        this.checkAddress(data.receiving_add)
        this.checkAddress(data.sending_add)
        this.checkId(data.sending_office)
        this.checkId(data.receiving_office, true)
        this.checkStatus(data.status)
    }
}