import parcelModel from "@/models/parcel.model";
import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { ParcelGraph } from "@/schema/types/parcel.graph";

interface IArgs {
    pids: string[];
}

export const parcelsQuery: GraphQLFieldConfig<undefined, any, IArgs> = {
    type: GraphQLList(ParcelGraph),
    description: "Parcel Query",
    args: {
        pids: { type: GraphQLNonNull(GraphQLList(GraphQLString)) }
    },

    resolve: async (source, args) => {
        if (args.pids && Array.isArray(args.pids)) {
            return await parcelModel.getParcels(args.pids);
        } else {
            return []
        }
    }
}
