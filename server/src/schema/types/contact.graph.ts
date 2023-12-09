import { GraphQLObjectType, GraphQLString } from "graphql";
import { IContact } from "@/models/schema/contact.schema";

export interface IContactOutputGraph extends IContact {}

export const ContactGraph = new GraphQLObjectType<IContactOutputGraph>({
    name: "ContactGraph",
    description: "Contact Graph",
    fields: {
        hotline: { type: GraphQLString },
        fax: { type: GraphQLString },
        email: { type: GraphQLString },
    }
})