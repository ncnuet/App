import { InputError } from "@/types/controller";
import BaseValidator, { IAddress, ICustomer } from "./base.validator";
import { ECostType, EParcelStatus, EReturnType, IParcel } from "@/models/schema/parcel.schema";
import { EGoodsType, IGoods } from "@/models/schema/goods.chema";
import { EGoodsCategory } from "@/models/schema/goods.chema";

export interface IParcelCreate
    extends Omit<IParcel, "receiving_office" | "sending_add" | "receiving_add">,
    Partial<Pick<IParcel, "receiving_office">> {
    sending_add: IAddress;
    receiving_add: IAddress;
}

export interface IParcelDelete {
    id: string;
}

export interface IParcelUpdate
    extends Partial<Omit<IParcel, "sending_office" | "sending_add" | "receiving_add">>,
    Pick<IParcel, "sending_office"> {
    id: string,
    sending_add?: IAddress,
    receiving_add?: IAddress
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

    private static checkGoodsType(type: string, und?: boolean) {
        if (type) {
            if (!Object.values(EGoodsType).includes(type as EGoodsType))
                throw new InputError("Invalid parcel's goods type", "goods_type");
        } else if (!und) throw new InputError("Must included parcel's goods type", "goods_type");
    }

    private static checkReturnType(type: string, und?: boolean) {
        if (type) {
            if (!Object.values(EReturnType).includes(type as EReturnType))
                throw new InputError("Invalid parcel's return type", "return_type");
        } else if (!und) throw new InputError("Must included parcel's return type", "return_type");
    }

    private static checkCostType(type: string, und?: boolean) {
        if (type) {
            if (!Object.values(ECostType).includes(type as ECostType))
                throw new InputError("Invalid parcel's cost type", "cost_type");
        } else if (!und) throw new InputError("Must included parcel's cost type", "cost_type");
    }

    private static checkGoods(goods: IGoods[], und?: boolean) {
        if (goods) {
            if (!Array.isArray(goods))
                throw new InputError("Goods must be an array", "goods");

            if (goods.some(_goods => !_goods.weight || !_goods.value ||
                !_goods.category || !_goods.quantity || !_goods.name))
                throw new InputError("Goods must include value, weight, category, quantity and name", "goods");

            if (goods.some(_goods => !Object.values(EGoodsCategory)
                .includes(_goods.category as EGoodsCategory)))
                throw new InputError("Invalid category good type", "goods.category");
        } else if (!und) throw new InputError("Must included parcel's goods", "goods");
    }

    private static checkName(name: string, und?: boolean) {
        if (name) {
            if (name.trim().length === 0) throw new InputError("Invalid name", "name");
        } else if (!und) throw new InputError("Must include name", "name");
    }

    private static checkCost(cost: number, und?: boolean) {
        if (cost) {
            if (cost < 0) throw new InputError("Invalid cost", "cost");
        } else if (!und) throw new InputError("Must include cost", "cost");
    }

    public static validateCreate(data: IParcelCreate) {
        this.checkCustomer(data.sender)
        this.checkCustomer(data.receiver)
        this.checkAddress(data.receiving_add)
        this.checkAddress(data.sending_add)
        this.checkId(data.receiving_office, true)
        this.checkStatus(data.status)
        this.checkGoods(data.goods)
        this.checkGoodsType(data.goods_type)
        this.checkReturnType(data.return_type);
        this.checkCostType(data.cost_type);
        this.checkCost(data.cost)
    }

    public static validateDelete(data: IParcelDelete) {
        this.checkId(data.id);
    }

    public static validateUpdate(data: IParcelUpdate) {
        this.checkId(data.id)
        this.checkCustomer(data.sender, true)
        this.checkCustomer(data.receiver, true)
        this.checkAddress(data.receiving_add, true)
        this.checkAddress(data.sending_add, true)
        this.checkId(data.receiving_office, true)
        this.checkStatus(data.status, true)
        this.checkGoods(data.goods, true)
        this.checkGoodsType(data.goods_type, true)
        this.checkReturnType(data.return_type, true);
        this.checkCostType(data.cost_type, true);
        this.checkCost(data.cost, true)
    }

    public static validateUpdateStatus(data: IParcelUpdateStatus) {
        this.checkId(data.id);
        this.checkStatus(data.status);
        this.checkName(data.name);
    }
}