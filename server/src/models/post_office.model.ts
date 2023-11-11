import {PostOfficeModel} from "./schema/post_office.chema";

class PostOffice {
    async createPostOffice(args: any) {
    
        const newPostOffice = new PostOfficeModel(args);
        await newPostOffice.save();
    };

    async getAllPostOfficeWithCondition(condition : any = null) {
        let postOffices = (condition == null) ? await PostOfficeModel.find() : await PostOfficeModel.find(condition);
        return postOffices;
    }

    async getPostOfficeByID(args: any) {
        return await PostOfficeModel.findById(args._id);
    }    
}

export default new PostOffice();