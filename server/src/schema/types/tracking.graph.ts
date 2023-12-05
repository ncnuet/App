import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { PostOfficeGraph } from "./post_office.graph";
import { ParcelGraph } from "./parcel.graph";
import { TrackingEventGraph } from "./event.graph";
import postOfficeModel from "@/models/postOffice.model";
import parcelModel from "@/models/parcel.model";

export interface ITrackingOutputGraph {
    tid: string;
    post_office: string;
    parcel: string;
    events: ITrackingOutputGraph
}

export const TrackingGraph = new GraphQLObjectType<ITrackingOutputGraph>({
    name: "TrackingGraph",
    description: "Tracking Graph",

    fields: {
        tid: { type: GraphQLString },
        post_office: {
            type: GraphQLList(PostOfficeGraph),
            resolve: async (parent) => {
                return await postOfficeModel.getPostOffices([parent.post_office])
            }
        },
        parcel: {
            type: GraphQLList(ParcelGraph),
            resolve: async (parent) => {
                return await parcelModel.getParcel([parent.parcel])
            }
        },
        events: {
            type: GraphQLList(TrackingEventGraph)
        }
    }
})