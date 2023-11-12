import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";

export const AddressLevelGraph = new GraphQLObjectType({
    name: "AddressLevelGraph",
    description: "Address Level Graph",

    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString }
    }
})

export const AddressGraph = new GraphQLObjectType({
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