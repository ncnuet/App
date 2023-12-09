import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { UserGraph } from "@/schema/types/user.graph";
import userModel from "@/models/user.model";

interface IArgs {
    uids: string[]
}

export const userQuery: GraphQLFieldConfig<undefined, any, IArgs> = {
    type: GraphQLList(UserGraph),
    description: "User Query",
    args: {
        uids: { type: GraphQLNonNull(GraphQLList(GraphQLString)) }
    },

    resolve: async (parent, args) => {
        if (args.uids && Array.isArray(args.uids)) {
            return await userModel.getUsers(args.uids);
        } else {
            return []
        }
    }
}