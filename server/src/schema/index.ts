import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { gatherPostOffices, transPostOffices } from "./queries/post_office.query";

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    
    fields: () => ({
        gatherPostOffices,
        transPostOffices
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
});


export default schema;
