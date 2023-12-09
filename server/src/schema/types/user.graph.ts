import { EUserRole, IUserWithoutVersion } from "@/types/auth";
import toGraphEnum from "@/utils/to_graph_enum";
import { GraphQLEnumType, GraphQLObjectType, GraphQLString } from "graphql";

export interface IUserOutputGraph
    extends Omit<IUserWithoutVersion, "username"> { }

export const UserTypeEnum = new GraphQLEnumType({
    name: "UserTypeEnum",
    description: "User Type Enum",
    values: toGraphEnum(EUserRole)
})

export const UserGraph = new GraphQLObjectType<IUserOutputGraph>({
    name: "UserGraph",
    description: "User Graph",
    fields: {
        uid: { type: GraphQLString },
        name: { type: GraphQLString },
        office: { type: GraphQLString },
        role: { type: UserTypeEnum },
    }
})