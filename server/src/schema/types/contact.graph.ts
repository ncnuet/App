import { GraphQLObjectType, GraphQLString } from "graphql";

export const ContactGraph = new GraphQLObjectType({
    name: "ContactGraph",
    description: "Contact Graph",
    fields: {
        hotline: { type: GraphQLString },
        fax: { type: GraphQLString },
        email: { type: GraphQLString },
    }
})