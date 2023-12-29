import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { OfficeGraph } from "@/schema/types/office.graph";
import OfficeModel from '@/models/office.model';

interface IArgs {
    poids: string[];
}

export const officeQuery: GraphQLFieldConfig<undefined, any, IArgs> = {
    type: GraphQLList(OfficeGraph),
    description: "OfficeQuery",
    args: {
        poids: { type: GraphQLList(GraphQLString) }
    },

    resolve: async (source, args) => {
        if (args.poids && Array.isArray(args.poids)) {
            return await OfficeModel.getOffices(args.poids);
        } else {
            return OfficeModel.getOffices();
        }
    }
}