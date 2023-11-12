import { GraphQLObjectType, GraphQLString } from "graphql";

export const CustomerGraph = new GraphQLObjectType({
    name: 'CustomerGraph',
    description: "Customer Graph",

    fields: {
        name: { type: GraphQLString },
        phone: { type: GraphQLString }
    }
})