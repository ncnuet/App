import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from "graphql";
import { FormGraph } from "./form.graph";
import { UserBaseModel } from "@/models/base/user.base";
import userModel from "@/models/user.model";

export interface IUserOutputGraph {
    uid: string;
    name: string;
    role: string;
    version: number;
    email: string;
    phone: string;
    username: string;
}

export const UserGraph = new GraphQLObjectType({
    name: "UserGraph",
    description: "User Graph",
    fields: {
        uid: { type: GraphQLString },
        name: { type: GraphQLString },
        role: { type: GraphQLString },
        version: { type: GraphQLFloat },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        username: { type: GraphQLString },
    }
})

export const GDVGraph = new GraphQLObjectType({
    name: "GDVGraph",
    description: "GDV Graph",
    fields: {
        uid: { type: GraphQLString },
        name: { type: GraphQLString },
        role: { type: GraphQLString },
        version: { type: GraphQLFloat },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        username: { type: GraphQLString },
        forms_send_customer_create: {
            type: GraphQLList(FormGraph),
            resolve: async (parent) => {
                const result = await userModel.getFormToCustomer(
                    parent.uid,
                    "GDV"
                );
                return result;
            }
        }
    }
});