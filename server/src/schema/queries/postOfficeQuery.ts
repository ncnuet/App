import { GraphQLFieldConfig, GraphQLList, GraphQLString } from "graphql";
import { GatherPostOfficeType } from "../graphType/postOffice";
import PostOffice from '@/models/post_office.model';
import { PostOfficeType } from "@/types/post_office";
import { FilterQuery } from "mongoose";
import { IPostOffice } from "@/models/schema/post_office.chema";


const gatherPostOffices: GraphQLFieldConfig<any, any, FilterQuery<IPostOffice>> = {
    type: new GraphQLList(GatherPostOfficeType),
    description: 'List of all gathering post offices statifying filter.',
    args: {
        poid: { type: GraphQLString }
    },

    resolve: async (source, args, context) => {
        console.log(source, args);
        
        let postOffices = await PostOffice.getPostOffices(PostOfficeType.Gather, args);
        return postOffices;
    }
};

const transPostOffices: GraphQLFieldConfig<any, any, FilterQuery<IPostOffice>> = {
    type: new GraphQLList(GatherPostOfficeType),
    description: 'List of all transaction post offices statifying filter.',
    args: {
        poid: { type: GraphQLString }
    },
    resolve: async (parent, args, context) => {
        let postOffices = await PostOffice.getPostOffices(PostOfficeType.Transaction, args);
        return postOffices;
    }
};



export { gatherPostOffices, transPostOffices };