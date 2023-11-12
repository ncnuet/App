import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";

export const AddressGraph = new GraphQLObjectType({
    name: 'AddressGraph',
    description: 'This is add an address',
    fields: () => ({
        country: { type: GraphQLString },
        province: { type: GraphQLString },
        district: { type: GraphQLString },
        commune: { type: GraphQLString },
        detail: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        long: { type: GraphQLFloat },
    })
});