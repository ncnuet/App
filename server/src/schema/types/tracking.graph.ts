import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import {OfficeGraph } from "./office.graph";
import { ParcelGraph } from "./parcel.graph";
import { TrackingEventGraph } from "./event.graph";
import officeModel from "@/models/office.model";
import parcelModel from "@/models/parcel.model";

export interface ITrackingOutputGraph {
    tid: string;
    parcel: string;
    events: ITrackingOutputGraph
}

export const TrackingGraph = new GraphQLObjectType<ITrackingOutputGraph>({
    name: "TrackingGraph",
    description: "Tracking Graph",

    fields: {
        tid: { type: GraphQLString },
        parcel: {
            type: GraphQLList(ParcelGraph),
            resolve: async (parent) => {
                return await parcelModel.getParcels([parent.parcel])
            }
        },
        events: {
            type: GraphQLList(TrackingEventGraph)
        }
    }
})