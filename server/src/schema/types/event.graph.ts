import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UserGraph } from "./user.graph";
import { OfficeGraph } from "./office.graph";
import { ITrackingEvent } from "@/models/schema/event.schema";
import userModel from "@/models/user.model";
import officeModel from "@/models/office.model";

export interface ITrackingEventOutputGraph extends ITrackingEvent { }

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
        },
        office: {
            type: GraphQLList(OfficeGraph),
            resolve: async (parent) => {
                return await officeModel.getOffices([parent.office])
            }
        },
    }
})