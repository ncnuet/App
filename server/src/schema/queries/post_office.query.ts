import { GraphQLFieldConfig, GraphQLList, GraphQLString } from "graphql";
import { PostOfficeGraph } from "@/schema/types/post_office.graph";
import PostOfficeModel from '@/models/post_office.model';
import { EPostOfficeType } from "@/types/post_office";

export const gatherPostOfficesQuery: GraphQLFieldConfig<any, any> = {
    type: GraphQLList(PostOfficeGraph),
    description: 'List of all gathering post offices statifying filter.',
    args: {
        poid: { type: GraphQLString }
    },

    resolve: async (source, args) => {
        let postOffices = await PostOfficeModel.getPostOffices(EPostOfficeType.Gather, args);
        return postOffices;
    }
};

export const transPostOfficesQuery: GraphQLFieldConfig<any, any> = {
    type: GraphQLList(PostOfficeGraph),
    description: 'List of all transaction post offices statifying filter.',
    args: {
        poid: { type: GraphQLString }
    },

    resolve: async (source, args) => {
        let postOffices = await PostOfficeModel.getPostOffices(EPostOfficeType.Transaction, args);
        return postOffices;
    }
};