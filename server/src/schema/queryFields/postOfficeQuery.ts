import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { GatherPostOfficeType, PostOfficeTypeEnum, TranPostOfficeType } from "../graphType/postOffice";
import PostOffice from '@/models/post_office.model';
import { PostOfficeType } from "../type/type";


const gatherPostOffices = {
    type: new GraphQLList(GatherPostOfficeType),
        description: 'List of all  gather post offices',
            resolve: async () => {
                let postOffices = await PostOffice.getAllPostOfficeWithCondition({
                    post_office_type: PostOfficeType.Gather,
                });
                return postOffices;
            }
};

const gatherPostOffice = {
    type: GatherPostOfficeType,
        description: 'This is represent a gather post office',
            args: {
        poid: { type: GraphQLString },
    },

    resolve: async (parent: Object, args: Object, context: any) => {
        let postOffices = await PostOffice.getAllPostOfficeWithCondition({
            ...args,
            post_office_type: PostOfficeType.Gather,
        });
        return postOffices[0];

    }
};


const tranPostOffices = {
    type: new GraphQLList(TranPostOfficeType),
        description: "This is represent all tran post office",
            resolve: async (parent: Object, args: Object, context: any) => {
                return await PostOffice.getAllPostOfficeWithCondition({
                    post_office_type: PostOfficeType.Transaction,
                });
            }
};

const tranPostOffice = {
    type: TranPostOfficeType,
        description: 'This is represent a tran post office',
            args: {
        poid: { type: GraphQLString },
    },

    resolve: async (parent: Object, args: Object, context: any) => {
        let postOffices = await PostOffice.getAllPostOfficeWithCondition({
            ...args,
            post_office_type: PostOfficeType.Transaction
        });
        return postOffices[0];

    }
};



export {gatherPostOffices, gatherPostOffice, tranPostOffice, tranPostOffices};