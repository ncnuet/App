import { EGoodsCategory } from "@/models/schema/goods.chema";
import { GraphQLEnumType, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export interface IGoodsOutputGraph {
    name: string;
    category: EGoodsCategory;
    quantity: number;
    value: number;
    weight: number;
    attached: string;
}

const GoodsCategoryEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'GoodsCategoryEnum',
    description: "Goods Category Enum",

    values: {
        ELECTRONICE_DEVICE: { value: EGoodsCategory.ELECTRONICE_DEVICE }
    },
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