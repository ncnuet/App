import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";
import { IAddressLevel, IAddress } from "@/models/schema/address.schema";

export interface IAddressLevelOutputGraph extends IAddressLevel { }

export interface IAddressOutputGraph
    extends Omit<IAddress, "country" | "province" | "district" | "commune"> {
    country: IAddressLevelOutputGraph
    province: IAddressLevelOutputGraph
    district: IAddressLevelOutputGraph
    commune: IAddressLevelOutputGraph
}

export const AddressLevelGraph = new GraphQLObjectType<IAddressLevelOutputGraph>({
    name: "AddressLevelGraph",
    description: "Address Level Graph",

    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString }
    }
})

export const AddressGraph = new GraphQLObjectType<IAddressOutputGraph>({
    name: 'AddressGraph',
    description: 'Address Graph',
    fields: {
        country: { type: AddressLevelGraph },
        province: { type: AddressLevelGraph },
        district: { type: AddressLevelGraph },
        commune: { type: AddressLevelGraph },
        detail: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        long: { type: GraphQLFloat },
    }
});