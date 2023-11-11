import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { gatherPostOffices, transPostOffices } from "./queries/postOfficeQuery";

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        gatherPostOffices,
        transPostOffices
    })
});

const schema: GraphQLSchema = new GraphQLSchema({
    query: RootQueryType
});


export default schema;
