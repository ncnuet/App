import { EUserRole, IUserWithoutVersion } from "@/types/auth";
import toGraphEnum from "@/utils/to_graph_enum";
import { GraphQLEnumType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { OfficeGraph } from "./office.graph";
import OfficeModel from "@/models/office.model";

export interface IUserOutputGraph
    extends Omit<IUserWithoutVersion, "username"> { }

export const UserTypeEnum = new GraphQLEnumType({
    name: "UserTypeEnum",
    description: "User Type Enum",
    values: toGraphEnum(EUserRole)
})

export const UserGraph = new GraphQLObjectType<IUserOutputGraph>({
    name: "UserGraph",
    description: "User Graph",
    fields: () => ({
        uid: { type: GraphQLString },
        name: { type: GraphQLString },
        role: { type: UserTypeEnum },
        office: {
            type: GraphQLList(OfficeGraph),
            resolve: async (parent) => {
                return parent.office ? await OfficeModel.getOffices([parent.office]) : null
            }
        },
    })
})