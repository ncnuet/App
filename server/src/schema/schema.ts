import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLSchema,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLEnumType,
    GraphQLInt,
    GraphQLScalarType,
} from 'graphql';
import {addPostOffice} from "./mutationFields/postOfficeMutation";
import {gatherPostOffices, gatherPostOffice, tranPostOffices, tranPostOffice} from "./queryFields/postOfficeQuery";

const RootQueryType : GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        gatherPostOffices,
        gatherPostOffice,
        tranPostOffices,
        tranPostOffice,
    })

});



const RootMutationType : GraphQLObjectType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Mutation',
    fields: () => (
        {
            addPostOffice
        }
    )
})

const schema : GraphQLSchema= new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});


export default schema;
