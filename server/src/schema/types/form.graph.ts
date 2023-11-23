import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { IParcelOutputGraph, ParcelGraph } from "./parcel.graph";
import formModel from "@/models/form.model";
import parcelModel from "@/models/parcel.model";

export interface IFormOutputGraph {
    fid: string;
    type: string;
    parcel: [string];
    user: string;
}

export const FormGraph = new GraphQLObjectType <IFormOutputGraph>({
    name: 'FormGraph',
    description: 'Form Graph',
    fields: {
        fid: {type: GraphQLString},
        type:  {type: GraphQLString},
        user:  {type: GraphQLString},
        parcel : {
            type: GraphQLList(ParcelGraph),
            resolve : async (parent) => {
                return await parcelModel.getParcel(parent.parcel)
            }
        }
    }
})