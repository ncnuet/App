import { GraphQLFieldConfig, GraphQLList, GraphQLString } from "graphql";
import { GDVGraph, UserGraph } from "../types/user.graph";
import userModel from "@/models/user.model";

interface IArgs {
    _id: string,
    _ids: string[]
}

export const userQuery: GraphQLFieldConfig<any, any, IArgs> = {
    type: GraphQLList(UserGraph),
    args: {
        _id: { type: GraphQLString },
        _ids: { type: GraphQLList(GraphQLString) }
    },

    resolve: async (parent, args) => {
        if (args._id) {            
            return await userModel.getUsers([args._id]);
        } else if (args._ids && Array.isArray(args._ids)) {
            return await userModel.getUsers(args._ids);
        } else {
            return []
        }
    }
};

export const GDVQuery: GraphQLFieldConfig<any, any, IArgs> = {
    type: GraphQLList(GDVGraph),
    args: {
        _id: { type: GraphQLString },
        _ids: { type: GraphQLList(GraphQLString) }
    },

    resolve: async (parent, args) => {
        if (args._id) {            
            return await userModel.getUserWithRole( "GDV", [args._id]);
        } else if (args._ids && Array.isArray(args._ids)) {
            return await userModel.getUserWithRole("GDV", args._ids);
        } else {
            return await userModel.getUserWithRole("GDV");
        }
    }
};
