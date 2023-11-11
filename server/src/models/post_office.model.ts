import { PostOfficeType } from "@/schema/types/type";
import { IPostOffice, PostOfficeBaseModel } from "./schema/post_office.chema";
import { FilterQuery } from "mongoose";

class PostOffice {
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

export default new PostOffice();