import { GraphQLObjectType, GraphQLString } from "graphql";

export interface ICustomerOutputGraph {
    name: string;
    phone: string;
}

export const CustomerGraph = new GraphQLObjectType<ICustomerOutputGraph>({
    name: 'CustomerGraph',
    description: "Customer Graph",

    fields: {
        name: { type: GraphQLString },
        phone: { type: GraphQLString }
    }
})