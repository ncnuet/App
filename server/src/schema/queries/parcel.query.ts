import parcelModel from "@/models/parcel.model";
import { GraphQLFieldConfig, GraphQLList, GraphQLScalarType, GraphQLString } from "graphql";
import { ParcelGraph } from "../types/parcel.graph";

interface IArgs {
    pid: string;
    pids: string[];
}

export const parcelsQuery: GraphQLFieldConfig<any, any, IArgs> = {
    type: GraphQLList(ParcelGraph),
    description: "Parcel Query",
    args: {
        pid: { type: GraphQLString },
        pids: { type: GraphQLList(GraphQLString) }
    },

    resolve: async (source, args) => {
        if (args.pid) {
            return await parcelModel.getParcel([args.pid]);
        } else if (args.pids && Array.isArray(args.pids)) {
            return await parcelModel.getParcel(args.pids);
        } else {
            return []
        }
    }
}
