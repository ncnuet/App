import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { officeQuery } from "./queries/office.query";
import { parcelsQuery } from './queries/parcel.query';
import { userQuery } from './queries/user.query';
import { trackingQuery } from './queries/tracking.query';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',

    fields: () => ({
        parcels: parcelsQuery,
        users: userQuery,
        post_offices: officeQuery,
        tracking: trackingQuery
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
});


export default schema;
