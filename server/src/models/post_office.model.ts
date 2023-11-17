import { EPostOfficeType } from "@/types/post_office";
import { IPostOffice } from "./schema/post_office.schema";
import { PostOfficeBaseModel } from "./base/post_office.base";

class PostOfficeModel {
    async createPostOffice(args: any) {

        const newPostOffice = new PostOfficeBaseModel(args);
        await newPostOffice.save();
    };

    async getPostOffices(poid: string[]) {
        const post_offices = await PostOfficeBaseModel.find(
            { _id: { $in: poid } }
        ).exec();

        return post_offices.map(offices => {
            const { _id, name, address, contact, post_office_type, manager, gather_office } = offices
            return {
                poid: _id.toString(),
                name, address, contact, post_office_type,
                manager: manager.toString(),
                gather_office: gather_office.toString()
            }
        });
    }
}

export default new PostOfficeModel();