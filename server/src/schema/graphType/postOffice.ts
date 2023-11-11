import { GraphQLEnumType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { PostOfficeType } from "../type/type";
import { AddressGraph } from "../common/AddressGraph";
import PostOffice from '@/models/post_office.model';

const PostOfficeTypeEnum : GraphQLEnumType = new GraphQLEnumType({
    name: 'PostOfficeTypeEnum',
    values: {
        TRANSACTION: { value: PostOfficeType.Transaction },
        GATHERING: { value: PostOfficeType.Gather },
    },
});

const GatherPostOfficeType : GraphQLObjectType = new GraphQLObjectType({
    name: 'gather_post_office',
    description: 'This is a represent all gather post offices',
    fields: () => ({

        poid: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: {
            type: AddressGraph,
        },
        manager_id: { type: new GraphQLNonNull(GraphQLString) },
        hotline: { type: new GraphQLNonNull(GraphQLString) },
        fax: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        post_office_type: {
            type: new GraphQLNonNull(PostOfficeTypeEnum),
            
        },
        post_office_id: {
            type: new GraphQLNonNull(GraphQLString),
            
        },

       tranPostOffice: {
        type: new GraphQLList(TranPostOfficeType),
        resolve: (parent, args, context) => {
            return PostOffice.getAllPostOfficeWithCondition({
                post_office_type: PostOfficeType.Transaction,
                post_office_id : parent.poid,
            })
        }
       }

    })
});


const TranPostOfficeType : GraphQLObjectType = new GraphQLObjectType({
    name: 'tran_post_office',
    description: 'This is a represent all tran post offices',
    fields: () => ({

        poid: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: {
            type: AddressGraph,
        },
        manager_id: { type: new GraphQLNonNull(GraphQLString) },
        hotline: { type: new GraphQLNonNull(GraphQLString) },
        fax: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        post_office_type: {
            type: new GraphQLNonNull(PostOfficeTypeEnum),
            
        },
        post_office_id: {
            type: new GraphQLNonNull(GraphQLString),
            
        },

        gatherPostOffices : {
            type: GatherPostOfficeType,
            resolve: async (parent, args, context) => {
                
                
                let gatherPostOffice =  await PostOffice.getAllPostOfficeWithCondition({
                    post_office_type: PostOfficeType.Gather,
                    poid: parent.post_office_id
                });
                return gatherPostOffice[0];
            }
        }

    })
});

export {GatherPostOfficeType, TranPostOfficeType, PostOfficeTypeEnum};