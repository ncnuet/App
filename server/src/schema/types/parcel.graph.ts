import { GraphQLEnumType, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { AddressGraph, IAddressOutputGraph } from "./address.graph";
import { CustomerGraph, ICustomerOutputGraph } from "./customer.graph";
import { GoodsGraph, IGoodsOutputGraph } from "./goods.graph";
import { EParcelStatus } from "@/models/schema/parcel.schema";
import { PostOfficeGraph } from "./post_office.graph";
import PostOfficeModel from '@/models/postOffice.model';

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
}

const ParcelStatusEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'ParcelStatusEnum',
    description: "Parcel Status Enum",

    values: {
        DELIVERING: { value: EParcelStatus.DELIVERING },
        DELIVERED: { value: EParcelStatus.DELIVERED },
        FAILED: { value: EParcelStatus.FAILED }
    },
});



const StatusGraph: GraphQLObjectType = new GraphQLObjectType({
    name: "StatusGraph",
    description: "Status Graph",

    fields: {
        name: { type: GraphQLString },
        createdAt: { type: GraphQLInt }
    }
})


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
        sending_office: {
            type: GraphQLList(PostOfficeGraph), resolve: async (parent) => {
                return await PostOfficeModel.getPostOffices([parent.sending_office])
            }
        },
        receiving_office: {
            type: GraphQLList(PostOfficeGraph), resolve: async (parent) => {
                return await PostOfficeModel.getPostOffices([parent.receiving_office])
            }
        },
    }
})