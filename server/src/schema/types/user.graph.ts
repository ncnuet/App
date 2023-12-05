import { GraphQLObjectType, GraphQLString } from "graphql";

export interface IUserOutputGraph {
    uid: string;
    name: string;
}

export const UserGraph = new GraphQLObjectType({
    name: "UserGraph",
    description: "User Graph",
    fields: {
        uid: { type: GraphQLString },
        name: { type: GraphQLString },
    }
})