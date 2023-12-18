import { GraphQLEnumType, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { AddressGraph, IAddressOutputGraph } from "./address.graph";
import { CustomerGraph, ICustomerOutputGraph } from "./customer.graph";
import { GoodsGraph, GoodsTypeEnum, IGoodsOutputGraph } from "./goods.graph";
import { ECostType, EParcelStatus, EReturnType } from "@/models/schema/parcel.schema";
import { OfficeGraph } from "./office.graph";
import { UserGraph } from "./user.graph";
import { IParcel } from "@/models/schema/parcel.schema";
import OfficeModel from '@/models/office.model';
import UserModel from "@/models/user.model";
import toGraphEnum from "@/utils/to_graph_enum";

export interface IParcelOutputGraph
    extends Omit<IParcel, "sender" | "sending_add" | "receiver" | "receiving_add" | "goods"> {
    pid: string;
    sender: ICustomerOutputGraph,
    sending_add: IAddressOutputGraph
    receiver: ICustomerOutputGraph
    receiving_add: IAddressOutputGraph
    goods: IGoodsOutputGraph
}

const ParcelStatusEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'ParcelStatusEnum',
    description: "Parcel Status Enum",

    values: toGraphEnum(EParcelStatus)
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
        creator: {
            type: GraphQLList(UserGraph), resolve: async (parent) => {
                return parent.creator ? await UserModel.getUsers([parent.creator]) : null;
            }
        },
        sending_office: {
            type: GraphQLList(OfficeGraph), resolve: async (parent) => {
                return parent.sending_office ? await OfficeModel.getOffices([parent.sending_office]) : null
            }
        },
        receiving_office: {
            type: GraphQLList(OfficeGraph), resolve: async (parent) => {
                return parent.receiving_office ? await OfficeModel.getOffices([parent.receiving_office]) : null
            }
        },
    }
})