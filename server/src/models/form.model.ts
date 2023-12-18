import { IFormCreate, IFormUpdate } from "@/validators/form.validator";
import { FormBaseModel } from "./base/form.base";

class FormModel {
    async getForm(fid: string[]) {
        const form = await FormBaseModel.find(
            {_id: {$in: fid}},
        ).exec();

        return form
    }

    async createForm(data: IFormCreate, creator : string ) {
        const response = await FormBaseModel.create({
            creator: creator,
            receiver: data.receiver,
            type: data.type,
            content: data.content,
        })

        return response._id;
    }

    async updateReciverOrTypeForm(data: IFormUpdate, editor: string) {
        const result = await FormBaseModel.findByIdAndUpdate(
            {_id : data.id_form},
            {
                receiver: data.receiver,
                type: data.type,
                content: data.content,
            }
        )

        return result;
    }
}

export default new FormModel();