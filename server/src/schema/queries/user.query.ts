import { GraphQLEnumType, GraphQLFieldConfig, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { UserGraph } from "@/schema/types/user.graph";
import userModel from "@/models/user.model";
import toGraphEnum from "@/utils/to_graph_enum";

enum EUserSearch {
    ID = "id",
    Head = "head",
    Staff = "staff",
}

interface IArgs {
    uids: string[],
    offices: string[],
    type: EUserSearch
}

const UserSearchType: GraphQLEnumType = new GraphQLEnumType({
    name: "UserSearchEnum",
    description: "User Search Enum",

    values: toGraphEnum(EUserSearch)
})

export const userQuery: GraphQLFieldConfig<undefined, any, IArgs> = {
    type: GraphQLList(UserGraph),
    description: "User Query",
    args: {
        uids: { type: GraphQLList(GraphQLString) },
        offices: { type: GraphQLList(GraphQLString) },
        type: { type: GraphQLNonNull(UserSearchType) }
    },
    resolve: async (parent, args) => {
        switch (args.type) {
            case EUserSearch.Head:
                return await userModel.getManagers();

            case EUserSearch.ID:
                if (args.uids && Array.isArray(args.uids)) {
                    return await userModel.getUsers(args.uids);
                } else return []
            case EUserSearch.Staff:
                if (args.offices && Array.isArray(args.offices)) {
                    return await userModel.getStaff(args.offices);
                } else return []
            default:
                return [];
        }
    }
}