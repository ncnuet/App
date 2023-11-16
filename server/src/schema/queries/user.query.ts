import { GraphQLFieldConfig, GraphQLString } from "graphql";
import { UserGraph } from "../types/user.graph";

export const userQuery: GraphQLFieldConfig<any, any, any> = {
    type: UserGraph,

}