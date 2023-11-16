import { EPostOfficeType } from "@/types/post_office";
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
    async getPostOffices(poid: string,) {
        const post_offices = await PostOfficeBaseModel.find(
            { _id: poid }
        ).exec();

        return post_offices;
    }
}

export default new PostOfficeModel();