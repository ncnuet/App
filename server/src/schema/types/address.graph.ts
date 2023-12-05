import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";

export interface IAddressLevelOutputGraph {
    id: string;
    name: string;
}

export interface IAddressOutputGraph {
    country: IAddressLevelOutputGraph
    province: IAddressLevelOutputGraph
    district: IAddressLevelOutputGraph
    commune: IAddressLevelOutputGraph
    detail: string
    lat: number
    long: number
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