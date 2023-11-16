import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { gatherPostOfficesQuery, transPostOfficesQuery } from "./queries/post_office.query";
import { parcelsQuery } from './queries/parcel.query';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',

    fields: () => ({
        // gatherPostOffices: gatherPostOfficesQuery,
        // transPostOffices: transPostOfficesQuery,
        parcels: parcelsQuery
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
});


export default schema;
