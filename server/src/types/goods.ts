export enum EGoodsCategory {
    ELECTRONICE_DEVICE = "Electronic Devices",
}

export enum EGoodsType {
    DOCUMENT = "documentation",
    GOODS = "goods",
}

export interface IGoods {
    name: string;
    category: EGoodsCategory;
    quantity: number;
    weight: number;
    value: number;
    attached: string;
}