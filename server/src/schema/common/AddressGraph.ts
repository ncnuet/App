import { GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

const AddressGraph : GraphQLObjectType = new GraphQLObjectType({
    name: 'addAddress',
    description: 'This is add an address',
    fields: () => ({
        country: { type: new GraphQLNonNull(GraphQLString) },
        district : { type: new GraphQLNonNull(GraphQLString) },
        commune: { type: new GraphQLNonNull(GraphQLString) },
        detail: { type: new GraphQLNonNull(GraphQLString) },
        lat: { type: new GraphQLNonNull(GraphQLFloat) },
        long:{ type: new GraphQLNonNull(GraphQLFloat) },
    })
});

const AddressInputGraph : GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'address',
    description: 'This is a represent an address',
    fields: () => ({
        country: { type: new GraphQLNonNull(GraphQLString) },
        district : { type: new GraphQLNonNull(GraphQLString) },
        commune: { type: new GraphQLNonNull(GraphQLString) },
        detail: { type: new GraphQLNonNull(GraphQLString) },
        lat: { type: new GraphQLNonNull(GraphQLFloat) },
        long:{ type: new GraphQLNonNull(GraphQLFloat) },
    })
});

export {AddressInputGraph, AddressGraph};