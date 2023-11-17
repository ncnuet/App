import { GraphQLEnumType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { EPostOfficeType } from "@/types/post_office";
import { AddressGraph } from "@/schema/types/address.graph";
import PostOfficeModel from '@/models/post_office.model';
import { ContactGraph } from "./contact.graph";
import { UserGraph } from "./user.graph";
import authModel from "@/models/auth.model";
import userModel from "@/models/user.model";

const PostOfficeTypeEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'PostOfficeTypeEnum',
    description: "Post Office Type Enum",

    values: {
        TRANSACTION: { value: EPostOfficeType.Transaction },
        GATHERING: { value: EPostOfficeType.Gather },
    },
});

const PostOfficeGraph: GraphQLObjectType = new GraphQLObjectType({
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