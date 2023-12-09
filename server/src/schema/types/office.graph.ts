import { GraphQLEnumType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { EOfficeType, IOffice } from "@/models/schema/office.schema";
import { AddressGraph, IAddressOutputGraph } from "@/schema/types/address.graph";
import { ContactGraph, IContactOutputGraph } from "./contact.graph";
import { UserGraph } from "./user.graph";
import OfficeModel from '@/models/office.model';
import userModel from "@/models/user.model";
import toGraphEnum from "@/utils/to_graph_enum";

export interface IOfficeOutputGraph
    extends Omit<IOffice, "address" | "contact"> {
    poid: string;
    address: IAddressOutputGraph
    contact: IContactOutputGraph
}

const OfficeTypeEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'OfficeTypeEnum',
    description: "Office Type Enum",

    values: toGraphEnum(EOfficeType)
});

const OfficeGraph: GraphQLObjectType = new GraphQLObjectType<IOfficeOutputGraph>({
    name: 'OfficeGraph',
    description: 'Office Graph',

    fields: () => ({
        poid: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: AddressGraph },
        contact: { type: ContactGraph },
        office_type: { type: OfficeTypeEnum },
        manager: {
            type: GraphQLList(UserGraph),
            resolve: async (parent) => {
                return parent.manager ? await userModel.getUsers([parent.manager]) : null;
            }
        },
        gather_office: {
            type: GraphQLList(OfficeGraph),
            resolve: async (parent) => {
                return parent.gather_office ? await OfficeModel.getOffices([parent.gather_office]) : null
            }
        }
    })
});

export { OfficeGraph, OfficeTypeEnum };