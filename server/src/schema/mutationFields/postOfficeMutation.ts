import { GraphQLNonNull, GraphQLString } from "graphql";
import { GatherPostOfficeType, PostOfficeTypeEnum } from "../graphType/postOffice";
import { AddressInputGraph } from "../common/AddressGraph";
import PostOffice from '@/models/post_office.model';

const addPostOffice = {
    type: GatherPostOfficeType,
    description: 'Add a post office',
    args: {
        poid: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },


        address: {
            type: AddressInputGraph,
        },


        manager_id: { type: new GraphQLNonNull(GraphQLString) },
        hotline: { type: new GraphQLNonNull(GraphQLString) },
        fax: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        post_office_type: { type: new GraphQLNonNull(PostOfficeTypeEnum) },
        post_office_id: {
            type: new GraphQLNonNull(GraphQLString),
        },

    },
    resolve: async (parent: Object, args: Object, context: any) => {

        await PostOffice.createPostOffice(args);


    }
};

export { addPostOffice };