import { GraphQLFieldConfig, GraphQLList, GraphQLString } from "graphql";
import { PostOfficeGraph } from "@/schema/types/post_office.graph";
import PostOfficeModel from '@/models/postOffice.model';

interface IArgs {
    poid: string;
    poids: string[];
}

export const postOfficeQuery: GraphQLFieldConfig<any, any, IArgs> = {
    type: GraphQLList(PostOfficeGraph),
    description: "PostOfficeQuery",
    args: {
        poid: { type: GraphQLString },
        poids: { type: GraphQLList(GraphQLString) }
    },

    resolve: async (source, args) => {
        if (args.poid) {
            return await PostOfficeModel.getPostOffices([args.poid]);
        } else if (args.poid && Array.isArray(args.poid)) {
            return await PostOfficeModel.getPostOffices(args.poids);
        } else {
            return []
        }
    }
}