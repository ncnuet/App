export enum EGoodsCategory {
    ELECTRONICE_DEVICE = "Electronic Devices",
}

export interface IGoods {
    name: string;
    category: EGoodsCategory;
    quantity: number;
    weight: number;
    value: number;
    attached: string;
}