import { GraphQLEnumType, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { AddressGraph, IAddressOutputGraph } from "./address.graph";
import { CustomerGraph, ICustomerOutputGraph } from "./customer.graph";
import { GoodsGraph, IGoodsOutputGraph } from "./goods.graph";
import { ECostType, EParcelStatus, EReturnType } from "@/types/parcel";
import { OfficeGraph } from "./office.graph";
import OfficeModel from '@/models/office.model';
import { EGoodsType } from "@/types/goods";
import toGraphEnum from "@/utils/enum2grE";

export interface IParcelOutputGraph {
    pid: string;
    sender: string;
    sending_add: IAddressOutputGraph
    receiver: ICustomerOutputGraph
    receiving_add: IAddressOutputGraph
    status: EParcelStatus
    goods: IGoodsOutputGraph
    notes: string
    sending_office: string;
    receiving_office: string;
    goods_type: EGoodsType;
    return_type: EReturnType;
    cost: number;
    cost_type: ECostType;
}

const ParcelStatusEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'ParcelStatusEnum',
    description: "Parcel Status Enum",

    values: toGraphEnum(EParcelStatus)
});

const GoodsTypeEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'GoodsTypeEnum',
    description: "Goods Type Enum",

    values: toGraphEnum(EGoodsType)
});

const ReturnTypeEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'ReturnTypeEnum',
    description: "Return Type Enum",

    values: toGraphEnum(EReturnType)
});

const CostTypeEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'CostTypeEnum',
    description: "Cost Type Enum",

    values: toGraphEnum(ECostType)
});

export const ParcelGraph: GraphQLObjectType = new GraphQLObjectType<IParcelOutputGraph>({
    name: "ParcelGraph",
    description: "Parcel Graph",

    fields: {
        pid: { type: GraphQLString },
        sender: { type: CustomerGraph },
        sending_add: { type: AddressGraph },
        receiver: { type: CustomerGraph },
        receiving_add: { type: AddressGraph },
        status: { type: ParcelStatusEnum },
        goods: { type: GraphQLList(GoodsGraph) },
        notes: { type: GraphQLString },
        goods_type: { type: GoodsTypeEnum },
        return_type: { type: ReturnTypeEnum },
        cost: { type: GraphQLInt },
        cost_type: { type: CostTypeEnum },
        sending_office: {
            type: GraphQLList(OfficeGraph), resolve: async (parent) => {
                return await OfficeModel.getOffices([parent.sending_office])
            }
        },
        receiving_office: {
            type: GraphQLList(OfficeGraph), resolve: async (parent) => {
                return parent.receiving_office ? await OfficeModel.getOffices([parent.receiving_office]) : null
            }
        },
    }
})