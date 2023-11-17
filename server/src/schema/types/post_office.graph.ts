import { GraphQLEnumType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { EPostOfficeType } from "@/types/post_office";
import { AddressGraph, IAddressOutputGraph } from "@/schema/types/address.graph";
import PostOfficeModel from '@/models/postOffice.model';
import { ContactGraph, IContactOutputGraph } from "./contact.graph";
import { IUserOutputGraph, UserGraph } from "./user.graph";
import userModel from "@/models/user.model";

export interface IPostOfficeOutputGraph {
    poid: string;
    name: string;
    address: IAddressOutputGraph
    manager: string,
    contact: IContactOutputGraph
    post_office_type: EPostOfficeType
    gather_office: string
}


const PostOfficeTypeEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'PostOfficeTypeEnum',
    description: "Post Office Type Enum",

    values: {
        TRANSACTION: { value: EPostOfficeType.Transaction },
        GATHERING: { value: EPostOfficeType.Gather },
    },
});

const PostOfficeGraph: GraphQLObjectType = new GraphQLObjectType<IPostOfficeOutputGraph>({
    name: 'PostOfficeGraph',
    description: 'Post Office Graph',

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
        post_office_type: { type: PostOfficeTypeEnum },

        gather_office: {
            type: GraphQLList(PostOfficeGraph),
            resolve: async (parent) => {
                return await PostOfficeModel.getPostOffices([parent.gather_office])
            }
        }
    })
});

export { PostOfficeGraph, PostOfficeTypeEnum };