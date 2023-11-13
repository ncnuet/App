import { GraphQLEnumType, GraphQLObjectType, GraphQLString } from "graphql";
import { AddressGraph } from "./address.graph";
import { CustomerGraph } from "./customer.graph";
import { GoodsGraph } from "./goods.graph";
import { EParcelStatus } from "@/models/schema/parcel.schema";

const ParcelStatusEnum: GraphQLEnumType = new GraphQLEnumType({
    name: 'ParcelStatusEnum',
    description: "Parcel Status Enum",

    values: {
        DELIVERING: { value: EParcelStatus.DELIVERING },
        DELIVERED: { value: EParcelStatus.DELIVERED },
        FAILED: { value: EParcelStatus.FAILED }
    },
});


export const ParcelGraph: GraphQLObjectType = new GraphQLObjectType({
    name: "ParcelGraph",
    description: "Parcel Graph",

    fields: {
        pid: { type: GraphQLString },
        sending_add: { type: AddressGraph },
        receiving_add: { type: AddressGraph },
        sender: { type: CustomerGraph },
        receiver: { type: CustomerGraph },
        status: { type: ParcelStatusEnum },
        goods: { type: GoodsGraph }
    }
})