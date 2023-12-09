import { GraphQLEnumType, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { EGoodsCategory, EGoodsType, IGoods } from "@/models/schema/goods.chema";
import toGraphEnum from "@/utils/to_graph_enum";

export interface IGoodsOutputGraph extends IGoods {}

export const GoodsTypeEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'GoodsTypeEnum',
    description: "Goods Type Enum",

    values: toGraphEnum(EGoodsType)
});

export const GoodsCategoryEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'GoodsCategoryEnum',
    description: "Goods Category Enum",

    values: toGraphEnum(EGoodsCategory)
});


export const GoodsGraph = new GraphQLObjectType<IGoodsOutputGraph>({
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