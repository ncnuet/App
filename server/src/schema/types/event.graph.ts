import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { IUserOutputGraph, UserGraph } from "./user.graph";
import userModel from "@/models/user.model";
import { ObjectId } from "mongoose";

export interface ITrackingEventOutputGraph {
    name: string,
    responsor: ObjectId
}

export const TrackingEventGraph = new GraphQLObjectType<ITrackingEventOutputGraph>({
    name: "TrackingEventGraph",
    description: "Tracking Event Graph",

    fields: {
        name: { type: GraphQLString },
        responsor: {
            type: GraphQLList(UserGraph),
            resolve: async (parent) => {
                return await userModel.getUsers([parent.responsor.toString()])
            }
        }
    }
})