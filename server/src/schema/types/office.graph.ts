import { GraphQLEnumType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { EOfficeType } from "@/types/post_office";
import { AddressGraph, IAddressOutputGraph } from "@/schema/types/address.graph";
import OfficeModel from '@/models/office.model';
import { ContactGraph, IContactOutputGraph } from "./contact.graph";
import { UserGraph } from "./user.graph";
import userModel from "@/models/user.model";

export interface IOfficeOutputGraph {
    poid: string;
    name: string;
    address: IAddressOutputGraph
    manager: string,
    contact: IContactOutputGraph
    post_office_type: EOfficeType
    gather_office: string
}


const OfficeTypeEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'OfficeTypeEnum',
    description: "Office Type Enum",

    values: {
        TRANSACTION: { value: EOfficeType.Transaction },
        GATHERING: { value: EOfficeType.Gathering },
    },
});

const OfficeGraph: GraphQLObjectType = new GraphQLObjectType<IOfficeOutputGraph>({
    name: 'OfficeGraph',
    description: 'Office Graph',

    fields: () => ({
        poid: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: AddressGraph },
        manager: {
            type: GraphQLList(UserGraph),
            resolve: async (parent) => {
                return await userModel.getUsers([parent.manager])
            }
        },
        contact: { type: ContactGraph },
        post_office_type: { type: OfficeTypeEnum },

        gather_office: {
            type: GraphQLList(OfficeGraph),
            resolve: async (parent) => {
                return await OfficeModel.getOffices([parent.gather_office])
            }
        }
    })
});

export { OfficeGraph, OfficeTypeEnum };