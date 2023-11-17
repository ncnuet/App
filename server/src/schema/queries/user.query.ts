import { GraphQLFieldConfig, GraphQLList, GraphQLString } from "graphql";
import { UserGraph } from "../types/user.graph";
import userModel from "@/models/user.model";

interface IArgs {
    uid: string,
    uids: string[]
}

export const userQuery: GraphQLFieldConfig<any, any, IArgs> = {
    type: GraphQLList(UserGraph),
    args: {
        uid: { type: GraphQLString },
        uids: { type: GraphQLList(GraphQLString) }
    },

    resolve: async (parent, args) => {
        if (args.uid) {            
            return await userModel.getUsers([args.uid]);
        } else if (args.uids && Array.isArray(args.uids)) {
            return await userModel.getUsers(args.uids);
        } else {
            return []
        }
    }
}