import { GraphQLEnumType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { PostOfficeType } from "@/types/post_office";
import { AddressGraph } from "@/schema/types/address.graph";
import PostOfficeModel from '@/models/post_office.model';

const PostOfficeTypeEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'PostOfficeTypeEnum',
    description: "Post Office Type Enum",

    values: {
        TRANSACTION: { value: PostOfficeType.Transaction },
        GATHERING: { value: PostOfficeType.Gather },
    },
});

const PostOfficeGraph: GraphQLObjectType = new GraphQLObjectType({
    name: 'PostOfficeGraph',
    description: 'Post Office Graph',
    
    fields: () => ({
        poid: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: AddressGraph },
        manager_id: { type: GraphQLString },
        hotline: { type: GraphQLString },
        fax: { type: GraphQLString },
        email: { type: GraphQLString },
        post_office_type: { type: PostOfficeTypeEnum },
        post_office_id: { type: GraphQLString },

        tranPostOffice: {
            type: new GraphQLList(PostOfficeGraph),
            resolve: (parent, args) => {
                return PostOfficeModel.getPostOffices(
                    PostOfficeType.Transaction, {
                    post_office_id: parent.poid,
                })
            }
        }
    })
});

export { PostOfficeGraph, PostOfficeTypeEnum };