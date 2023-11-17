import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { postOfficeQuery } from "./queries/post_office.query";
import { parcelsQuery } from './queries/parcel.query';
import { userQuery } from './queries/user.query';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',

    fields: () => ({
        parcels: parcelsQuery,
        users: userQuery,
        post_offices: postOfficeQuery
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
});


export default schema;
