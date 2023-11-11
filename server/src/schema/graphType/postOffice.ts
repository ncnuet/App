import { GraphQLEnumType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { PostOfficeType } from "@/types/post_office";
import { AddressGraph } from "@/schema/types/address.graph";
import PostOffice from '@/models/post_office.model';

const PostOfficeTypeEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'PostOfficeTypeEnum',
    values: {
        TRANSACTION: { value: PostOfficeType.Transaction },
        GATHERING: { value: PostOfficeType.Gather },
    },
});

const GatherPostOfficeType: GraphQLObjectType = new GraphQLObjectType({
    name: 'gather_post_office',
    description: 'This is a represent all gather post offices',
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
            type: new GraphQLList(GatherPostOfficeType),
            resolve: (parent, args, context) => {
                return PostOffice.getPostOffices(PostOfficeType.Transaction, {
                    post_office_id: parent.poid,
                })
            }
        }
    })
});

export { GatherPostOfficeType, PostOfficeTypeEnum };