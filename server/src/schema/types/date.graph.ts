import { GraphQLScalarType, Kind } from "graphql";

export const DateGraph = new GraphQLScalarType({
    name: 'DateGraph',
    description: "Date Graph",

    serialize: (date: Date) => (new Date(date)).getTime(),
    parseValue: (date: Date) => (new Date(date)).getTime(),
});