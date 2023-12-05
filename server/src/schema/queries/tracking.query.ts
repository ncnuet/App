import { GraphQLFieldConfig, GraphQLList, GraphQLString } from "graphql";
import { TrackingGraph } from "../types/tracking.graph";
import trackingModel from "@/models/tracking.model";

interface IArgs {
    pid: string;
}

export const trackingQuery: GraphQLFieldConfig<any, any, IArgs> = {
    type: GraphQLList(TrackingGraph),
    args: {
        pid: { type: GraphQLString }
    },

    resolve: async (parent, args) => {
        if (args.pid) {            
            return await trackingModel.getTrackingByParcelID(args.pid)
        } else {
            return null;
        }
    }

}