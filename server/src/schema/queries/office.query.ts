import { GraphQLFieldConfig, GraphQLList, GraphQLString } from "graphql";
import { OfficeGraph } from "@/schema/types/office.graph";
import OfficeModel from '@/models/office.model';

interface IArgs {
    poid: string;
    poids: string[];
}

export const officeQuery: GraphQLFieldConfig<any, any, IArgs> = {
    type: GraphQLList(OfficeGraph),
    description: "OfficeQuery",
    args: {
        poid: { type: GraphQLString },
        poids: { type: GraphQLList(GraphQLString) }
    },

    resolve: async (source, args) => {
        if (args.poid) {
            return await OfficeModel.getOffices([args.poid]);
        } else if (args.poid && Array.isArray(args.poid)) {
            return await OfficeModel.getOffices(args.poids);
        } else {
            return []
        }
    }
}