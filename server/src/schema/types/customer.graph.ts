import { GraphQLObjectType, GraphQLString } from "graphql";
import { ICustomer } from "@/models/schema/customer.schema";

export interface ICustomerOutputGraph extends ICustomer {}

export const CustomerGraph = new GraphQLObjectType<ICustomerOutputGraph>({
    name: 'CustomerGraph',
    description: "Customer Graph",

    fields: {
        name: { type: GraphQLString },
        phone: { type: GraphQLString }
    }
})