import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { postOfficeQuery } from "./queries/post_office.query";
import { parcelsQuery } from './queries/parcel.query';
import { GDVQuery, userQuery } from './queries/user.query';
import { TrackingQuery } from './queries/tracking.query';

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',

    fields: () => ({
        parcels: parcelsQuery,

        users: userQuery,
        gdvs : GDVQuery,

        post_offices: postOfficeQuery,
        tracking: TrackingQuery
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
});


export default schema;
