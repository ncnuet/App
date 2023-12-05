import { GraphQLObjectType, GraphQLString } from "graphql";

export interface IContactOutputGraph {
    hotline: string;
    fax: string;
    email: string;
}

export const ContactGraph = new GraphQLObjectType<IContactOutputGraph>({
    name: "ContactGraph",
    description: "Contact Graph",
    fields: {
        hotline: { type: GraphQLString },
        fax: { type: GraphQLString },
        email: { type: GraphQLString },
    }
})