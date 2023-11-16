import { GraphQLObjectType, GraphQLString } from "graphql";

export const UserGraph = new GraphQLObjectType({
    name: "UserGraph",
    description: "User Graph",
    fields: {
        uid: { type: GraphQLString },
        name: { type: GraphQLString },
    }
})