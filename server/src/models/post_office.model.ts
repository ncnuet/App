import { PostOfficeType } from "@/types/post_office";
import { IPostOffice } from "./schema/post_office.schema";
import { FilterQuery } from "mongoose";
import { PostOfficeBaseModel } from "./base/post_office.base";

class PostOfficeModel {
    async createPostOffice(args: any) {

        const newPostOffice = new PostOfficeBaseModel(args);
        await newPostOffice.save();
    };

    /**
     * 
     * @param post_office_type 
     * @param filter FilterQuery<IPostOffice>
     * @returns 
     */
    async getPostOffices(post_office_type: PostOfficeType, filter: FilterQuery<IPostOffice> = {}) {
        const post_offices = await PostOfficeBaseModel.find({
            ...filter,
            post_office_type
        }).exec();

        return post_offices;
    }
}

export default new PostOfficeModel();