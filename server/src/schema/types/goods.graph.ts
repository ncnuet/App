import { GraphQLEnumType, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const GoodsCategoryEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'GoodsCategoryEnum',
    description: "Goods Category Enum",

    values: {
        
    },
});

export const GoodsGraph = new GraphQLObjectType({
    name: "GoodsGraph",
    description: "Goods Graph",

    fields: {
        name: { type: GraphQLString },
        category: { type: GoodsCategoryEnum },
        quantity: { type: GraphQLInt },
        value: { type: GraphQLInt },
        weight: { type: GraphQLInt },
        attached: { type: GraphQLString },
    }
})